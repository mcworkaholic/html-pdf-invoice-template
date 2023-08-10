import requests,json;
url = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/1G8ZK527XXZ394695?format=json'
r = requests.get(url)
parsed = json.loads(r.text);		
print(json.dumps(parsed, indent =4))