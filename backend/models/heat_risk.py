"""
Urban Heat Risk Index Model
Calculates heat risk based on temperature, population, and tree coverage
"""
import numpy as np

def calculate_heat_risk(city, coordinates, date):
    """
    Calculate heat risk index for a given city
    
    Args:
        city: City name
        coordinates: [lat, lon]
        date: Date string (YYYY-MM-DD)
    
    Returns:
        dict: Heat risk analysis results
    """
    
    # Mock data for now - will be replaced with actual model
    # In production, this would:
    # 1. Fetch Landsat LST data
    # 2. Get population density
    # 3. Calculate tree coverage
    # 4. Apply heat risk algorithm
    
    mock_data = {
        'Delhi': {'temp': 42, 'population': 1500000, 'treeCover': 18, 'riskIndex': 8.5},
        'New York': {'temp': 35, 'population': 1200000, 'treeCover': 27, 'riskIndex': 6.2},
        'London': {'temp': 28, 'population': 900000, 'treeCover': 33, 'riskIndex': 4.1},
        'Tokyo': {'temp': 32, 'population': 2000000, 'treeCover': 24, 'riskIndex': 6.8},
        'São Paulo': {'temp': 30, 'population': 1300000, 'treeCover': 31, 'riskIndex': 5.5},
        'Mumbai': {'temp': 38, 'population': 1800000, 'treeCover': 15, 'riskIndex': 7.9}
    }
    
    city_data = mock_data.get(city, mock_data['Delhi'])
    
    # Calculate risk level
    risk_index = city_data['riskIndex']
    if risk_index >= 8:
        risk_level = 'Critical'
        color = '#991b1b'
    elif risk_index >= 6:
        risk_level = 'High'
        color = '#ef4444'
    elif risk_index >= 4:
        risk_level = 'Moderate'
        color = '#f59e0b'
    else:
        risk_level = 'Low'
        color = '#22c55e'
    
    # Calculate affected population
    affected_population = int(city_data['population'] * (risk_index / 10))
    
    # Generate recommendations
    recommendations = []
    if risk_index >= 7:
        recommendations.append('Establish cooling centers immediately')
        recommendations.append('Increase tree canopy by 15%')
        recommendations.append('Implement heat warning system')
    elif risk_index >= 5:
        recommendations.append('Add green infrastructure')
        recommendations.append('Create shaded walkways')
    else:
        recommendations.append('Maintain current green space levels')
    
    return {
        'city': city,
        'date': date,
        'temperature': city_data['temp'],
        'riskIndex': risk_index,
        'riskLevel': risk_level,
        'riskColor': color,
        'treeCoverage': city_data['treeCover'],
        'affectedPopulation': affected_population,
        'recommendations': recommendations,
        'metrics': {
            'heatIntensity': city_data['temp'],
            'populationDensity': city_data['population'] / 100,  # per km²
            'vegetationCover': city_data['treeCover']
        }
    }
