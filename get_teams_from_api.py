import os
import tbaapiv3client
from tbaapiv3client.rest import ApiException
from dotenv import load_dotenv
import random
import json

load_dotenv('.env')

configuration = tbaapiv3client.Configuration(
    host="https://www.thebluealliance.com/api/v3"
)

configuration = tbaapiv3client.Configuration(
    host="https://www.thebluealliance.com/api/v3",
    api_key={
        'X-TBA-Auth-Key': str(os.getenv('TBA_TOKEN'))
    }
)

with tbaapiv3client.ApiClient(configuration) as api_client:
    api_instance = tbaapiv3client.ListApi(api_client)
    
    page_num = random.randint(0, 18)
    
    if_modified_since = 'if_modified_since_example'
    
    try:
        api_response = api_instance.get_teams(page_num, if_modified_since=if_modified_since)
        
        if api_response and len(api_response) > 0:
            random_team = json.dumps(random.choice(api_response).nickname)
            
            print(random_team)
        else:
            print("No teams found on page", page_num)
    except ApiException as e:
        print("Exception when calling ListApi->get_teams: %s\n" % e)
