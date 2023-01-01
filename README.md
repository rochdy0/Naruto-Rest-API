# Naruto Character API

# Documentation

### Get characters informations
URL : `GET http://localhost:3000/characters`
#### Parameters
Parameter  | Type | Required? | Description
------------- | ------------- | ------------- | -------------
character_id  | Number | Yes | The ID of character you want to get.
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
200 OK | Successfully retrieved the character.
404 Not Found | `character_id` not match with any characters.
400 Bad Request | • `character_id` not contain only numbers. <br> • `character_id` is missing.
500 Internal Server Error |

### Post character
URL : `POST http://localhost:3000/characters`
#### Parameters
Parameter  | Type | Required? | Deescription
------------- | ------------- | ------------- | ------------- 
first_name | String | Yes 
last_name | String | Yes
village | String | Yes | Valid values are `Konoha`, `Kiri`, `Kumo`, `Ame`, `Iwa`, `Oto`, `Suna`
father_name | String | Yes
mother_name | String | Yes
#### Response Code
HTTP Code | Description
------------- | -------------
201 Created | Successfully create character.
400 Bad Request | • One or multiple parameters are missing.<br>• One or multiple parameters are not String trype.
500 Internal Server Error |