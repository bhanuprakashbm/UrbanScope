"""
Green Space Analysis Model (GreenEx_Py Integration)
Calculates NDVI, coverage, accessibility, and visibility
"""
import numpy as np

def calculate_green_exposure(city, coordinates, buffer_distance=500):
    """
    Calculate green space exposure metrics
    
    Args:
        city: City name
        coordinates: [lat, lon]
        buffer_distance: Buffer distance in meters
    
    Returns:
        dict: Green space analysis results
    """
    
    # Mock data for now - will be replaced with GreenEx_Py functions
    # In production, this would call:
    # - get_mean_NDVI()
    # - get_greenspace_percentage()
    # - get_shortest_distance_greenspace()
    
    mock_data = {
        'Delhi': {'ndvi': 0.18, 'coverage': 12.5, 'distance': 850, 'accessibility': 'Poor'},
        'New York': {'ndvi': 0.35, 'coverage': 27.0, 'distance': 320, 'accessibility': 'Good'},
        'London': {'ndvi': 0.42, 'coverage': 33.0, 'distance': 280, 'accessibility': 'Excellent'},
        'Tokyo': {'ndvi': 0.28, 'coverage': 24.0, 'distance': 450, 'accessibility': 'Moderate'},
        'São Paulo': {'ndvi': 0.38, 'coverage': 31.0, 'distance': 380, 'accessibility': 'Good'},
        'Mumbai': {'ndvi': 0.22, 'coverage': 15.0, 'distance': 720, 'accessibility': 'Poor'}
    }
    
    city_data = mock_data.get(city, mock_data['Delhi'])
    
    # Determine status
    coverage = city_data['coverage']
    if coverage < 15:
        status = 'Critical'
        color = '#991b1b'
    elif coverage < 20:
        status = 'Poor'
        color = '#ef4444'
    elif coverage < 30:
        status = 'Moderate'
        color = '#f59e0b'
    else:
        status = 'Good'
        color = '#22c55e'
    
    # Calculate gap
    target_coverage = 30  # WHO recommendation
    gap = max(0, target_coverage - coverage)
    
    # Generate recommendations
    recommendations = []
    if coverage < 15:
        recommendations.append(f'Add {gap:.1f}% green space urgently')
        recommendations.append('Create 3-5 new parks in underserved areas')
        recommendations.append('Implement rooftop gardens program')
    elif coverage < 25:
        recommendations.append(f'Increase green space by {gap:.1f}%')
        recommendations.append('Add street trees and pocket parks')
    else:
        recommendations.append('Maintain current green infrastructure')
        recommendations.append('Focus on quality and accessibility')
    
    # Calculate affected population (people beyond 500m from park)
    if city_data['distance'] > 500:
        affected_population = 150000  # Mock value
    else:
        affected_population = 0
    
    return {
        'city': city,
        'meanNDVI': city_data['ndvi'],
        'greenspaceCoverage': coverage,
        'distanceToNearestPark': city_data['distance'],
        'accessibility': city_data['accessibility'],
        'status': status,
        'statusColor': color,
        'gap': gap,
        'targetCoverage': target_coverage,
        'affectedPopulation': affected_population,
        'recommendations': recommendations,
        'metrics': {
            'availability': coverage,
            'accessibility': 100 if city_data['distance'] < 300 else 50 if city_data['distance'] < 500 else 20,
            'visibility': city_data['ndvi'] * 100
        }
    }
