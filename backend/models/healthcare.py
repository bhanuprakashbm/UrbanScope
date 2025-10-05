"""
Healthcare Facility Access Analysis Model
Calculates accessibility to healthcare facilities and identifies underserved areas
"""
import numpy as np

def calculate_healthcare_access(city, coordinates, population, drive_time_threshold=15):
    """
    Calculate healthcare facility accessibility
    
    Args:
        city: City name
        coordinates: [lat, lon]
        population: Total population
        drive_time_threshold: Maximum acceptable drive time (minutes)
    
    Returns:
        dict: Healthcare access analysis results
    """
    
    # Mock data for now - will be replaced with actual model
    # In production, this would:
    # 1. Get healthcare facility locations from healthsites.io
    # 2. Calculate drive-time isolines using OSMNX
    # 3. Overlay with population data (GHS-POP)
    # 4. Identify underserved areas
    
    mock_data = {
        'Delhi': {'facilities': 45, 'access': 65, 'specialists': 120},
        'New York': {'facilities': 78, 'access': 85, 'specialists': 350},
        'London': {'facilities': 92, 'access': 90, 'specialists': 420},
        'Tokyo': {'facilities': 105, 'access': 88, 'specialists': 480},
        'São Paulo': {'facilities': 62, 'access': 72, 'specialists': 210},
        'Mumbai': {'facilities': 38, 'access': 58, 'specialists': 95}
    }
    
    city_data = mock_data.get(city, mock_data['Delhi'])
    
    # Calculate metrics
    facilities_count = city_data['facilities']
    population_with_access = city_data['access']
    population_without_access = 100 - population_with_access
    
    # Determine status
    if population_with_access >= 85:
        status = 'Excellent'
        color = '#22c55e'
    elif population_with_access >= 70:
        status = 'Good'
        color = '#4ade80'
    elif population_with_access >= 50:
        status = 'Moderate'
        color = '#f59e0b'
    else:
        status = 'Critical'
        color = '#ef4444'
    
    # Calculate underserved population
    underserved_population = int(population * (population_without_access / 100))
    
    # Calculate facilities needed
    # WHO recommendation: 1 facility per 10,000 people
    recommended_facilities = int(population / 10000)
    facilities_gap = max(0, recommended_facilities - facilities_count)
    
    # Generate recommended locations (mock)
    recommended_locations = []
    if facilities_gap > 0:
        # In production, this would use spatial optimization
        for i in range(min(facilities_gap, 5)):  # Show top 5
            recommended_locations.append({
                'lat': coordinates[0] + (np.random.rand() - 0.5) * 0.1,
                'lon': coordinates[1] + (np.random.rand() - 0.5) * 0.1,
                'priority': 'High' if i < 2 else 'Medium',
                'estimatedServedPopulation': 25000
            })
    
    # Generate recommendations
    recommendations = []
    if population_without_access > 30:
        recommendations.append(f'Build {facilities_gap} new healthcare facilities')
        recommendations.append('Focus on underserved neighborhoods')
        recommendations.append('Improve road network to existing facilities')
    elif population_without_access > 15:
        recommendations.append('Add mobile health clinics')
        recommendations.append('Improve public transportation to facilities')
    else:
        recommendations.append('Maintain current facility distribution')
        recommendations.append('Focus on specialist availability')
    
    # Identify underserved areas (mock zones)
    underserved_areas = []
    if population_without_access > 20:
        underserved_areas = ['Zone A (North)', 'Zone B (East)', 'Zone C (South)']
    
    return {
        'city': city,
        'facilitiesCount': facilities_count,
        'specialistsCount': city_data['specialists'],
        'populationWithAccess': population_with_access,
        'populationWithoutAccess': population_without_access,
        'underservedPopulation': underserved_population,
        'status': status,
        'statusColor': color,
        'facilitiesGap': facilities_gap,
        'recommendedFacilities': recommended_facilities,
        'underservedAreas': underserved_areas,
        'recommendedLocations': recommended_locations,
        'recommendations': recommendations,
        'metrics': {
            'facilitiesPerCapita': (facilities_count / population) * 100000,
            'averageDriveTime': drive_time_threshold * (population_without_access / 100),
            'coverageScore': population_with_access
        }
    }
