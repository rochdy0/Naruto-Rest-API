# Naruto Character API

# Documentation

### Get characters informations
URL : `GET http://localhost:3000/characters`
#### Parameters
Parameter  | Type | Required? | Description
------------- | ------------- | ------------- | -------------
character_id  | Number | No | The ID of character you want to get. If no `character_id` is specified, you will get all characters.
#### Response Body
Field | Type
------------- | -------------
character_id | Number 
first_name | String
last_name | String
village | String
father_name | String
mother_name | String
#### Response Code
HTTP Code | Description
------------- | -------------
200 OK | Successfully retrieved the list of character.
404 Not Found | `character_id` not match with any characters.
500 Internal Server Error |

### Post character
URL : `POST http://localhost:3000/characters`
#### Parameters
Parameter  | Type | Required?
------------- | ------------- | ------------- 
first_name | String | Yes 
last_name | String | Yes
village | String | Yes
father_name | String | Yes
mother_name | String | Yes
#### Response Code
HTTP Code | Description
------------- | -------------
201 Created | Successfully create character.
400 Bad Request | • One or multiple parameters are missing.<br>• One or multiple parameters are not String trype.
500 Internal Server Error |