import prettymaps

#place = "Düsseldorf, Germany"

#save_path = "public/assets/images/test_map.png" 

plot = prettymaps.plot(
    'Garopaba',
    radius = 5000,
    figsize = 'a4',
    layers = {'building': False},
    keypoints = {
        # Search for general keypoints specified by OSM tags
        'tags': {'building': ['beach']},
        # Or, search by specific name or free-text search
        # pretymaps will use a fuzzy string matching to search for the specified name
        'specific': {
            'pedra branca': {'tags': {'natural': ['peak']}},
        }
    },
)