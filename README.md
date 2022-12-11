# FoodOrder

Aplikacija skirta maisto užsakymui. Kiekvienas asmuo prisijungęs į internetinę svetainę gali peržiūrėti kiekvienos lokacijos meniu. Jei vartotojas yra prisijungęs, jis gali iš patiekalų sudaryti užsakymą ir jį užsisakyti (patvirtinti). Sistemos administratorius gali peržiūrėti varototojus, keisti jų roles, keisti lokacijas, jų turinį, keisti kiekvieno meniu turinį.

## Funkciniai reikalavimai

Vietovė -> Meniu -> Patiekalas

Neregistruotas vartotojas:
1.	Kaip neprisijungęs vartotojas, noriu peržiūrėti lokacijų sąrašą.
2.  Kaip neprisijungęs vartotojas, noriu peržiūrėti kiekvienos lokacijos meniu sąrašą.
3.  Kaip neprisijungęs vartotojas, noriu peržiūrėti kiekvieno meniu patiekalus.
4.	Kaip neprisijungęs vartotojas, noriu prisijungti.
5.	Kaip neprisijungęs vartotojas, noriu užsiregistruoti.


Registruotas vartotojas:
1.	Kaip registruotas vartotojas, noriu atsijungti.
2.	Kaip registruotas vartotojas, noriu į užsakymą pridėti patiekalus.
3.  Kaip registruotas vartotojas, noriu iš užsakymo išimti patiekalą.
4.	Kaip registruotas vartotojas, noriu patvirtinti savo užsakymą.


Sistemos administratorius:
1.	Kaip sistemos administratorius, noriu peržiūrėti visus vartotojus.
2.	Kaip sistemos administratorius, noriu keisti vartotojo rolę (paversti administratoriumi).
3.	Kaip sistemos administratorius, noriu pridėti naują lokaciją.
4.	Kaip sistemos administratorius, noriu redaguoti esamą lokaciją.
5.	Kaip sistemos administratorius, noriu ištrinti esamą lokaciją.
6.	Kaip sistemos administratorius, noriu prie lokacijos pridėti naują meniu.
7.	Kaip sistemos administratorius, noriu redaguoti meniu.
8.	Kaip sistemos administratorius, noriu iš lokacijos pašalinti meniu.
9.  Kaip sistemos administratorius, noriu prie meniu pridėti naują patiekalą.
10.  Kaip sistemos administratorius, noriu redaguoti patiekalą.
11.  Kaip sistemos administratorius, noriu iš meniu pašalinti patiekalą.

# API

<details>
<summary>API</summary>
## Locations

### Get all locations
| Locations | /locations/ |
|-------------|-------------|
| URL | /locations/ |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

#### Example
Example Request: GET /locations/ 


Example Response: 200 OK

Example Response Body: 
```
[
    {
        "_id": "633f0d09798d5c219b3d1d20",
        "country": "Germany",
        "city": "Frankfurt",
        "address": "Brzzz st. 100",
        "__v": 0
    },
    {
        "_id": "634341e7772aea9d34b42be2",
        "country": "Lithuania",
        "city": "Vilnius",
        "address": "Vilnius st. 39",
        "__v": 0
    },
    {
        "_id": "63434755b7909c7f9b626d3a",
        "country": "USA",
        "city": "Washington, DC",
        "address": "Biggest st. 1",
        "__v": 0
    },
    {
        "_id": "6396088c57fbf7e71d3172d7",
        "country": "Good",
        "city": "Better",
        "address": "Best",
        "__v": 0
    }
]
```

### Add a new location
| Locations | /locations/ |
|-------------|-------------|
| URL | /locations/ |
| Method | POST |
| Parameters | Country (string), City (string), Address (string) |
| HTTP responses | 201 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, admin |

#### Example
Example Request: POST /locations/ 

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "country": "Lithuania",
    "city": "Vilnius",
    "address": "Vilnius st. 39"
}
```

Example Response: 201 Created

Example Response Body: 
```
{
    "country": "Lithuania",
    "city": "Vilnius",
    "address": "Vilnius st. 39",
    "_id": "63964c1b8b991399cd75db76",
    "__v": 0
}
```

### Get a location
| Locations | /locations/{locationId} |
|-------------|-------------|
| URL | /locations/{locationId} |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

#### Example
Example Request: GET /locations/63964c1b8b991399cd75db76


Example Response: 200 OK

Example Response Body: 
```
{
    "_id": "63964c1b8b991399cd75db76",
    "country": "Lithuania",
    "city": "Vilnius",
    "address": "Vilnius st. 39",
    "__v": 0
}
```

### Delete a location
| Locations | /locations/{locationId} |
|-------------|-------------|
| URL | /locations/{locationId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, admin |

#### Example
Example Request: DELETE /locations/63964c1b8b991399cd75db76

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```


Example Response: 200 OK

Example Response Body: 
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```

### Update a location
| Locations | /locations/{locationId} |
|-------------|-------------|
| URL | /locations/{locationId} |
| Method | PATCH |
| Parameters | Country (string), City (string), Address (string) |
| HTTP responses | 200 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

#### Example
Example Request: PATCH /locations/63964c1b8b991399cd75db76

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "country": "Lithuania",
    "city": "Vilnius",
    "address": "Vilnius st. 39"
}
```

Example Response: 200 OK

Example Response Body: 
```
{
    "country": "Lithuania",
    "city": "Vilnius",
    "address": "Vilnius st. 39",
    "_id": "63964c1b8b991399cd75db76",
    "__v": 0
}
```

## Menus

### Get all menus of a certain location
| Menus | /locations/{locationId}/menus/ |
|-------------|-------------|
| URL | /locations/{locationId}/menus/ |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

#### Example
Example Request: GET /locations/633f0d09798d5c219b3d1d20/menus


Example Response: 200 OK

Example Response Body: 
```
[
    {
        "_id": "634344dd3f4278ff0e6a1394",
        "name": "Sushi",
        "description": "Most japanese thing you've ever tasted!",
        "creationDate": "2022-10-09T22:02:05.325Z",
        "lastUpdateDate": "2022-12-11T01:19:48.612Z",
        "location": "633f0d09798d5c219b3d1d20",
        "__v": 0,
        "image": "https://media.istockphoto.com/id/1053854126/photo/all-you-can-eat-sushi.jpg?s=170667a&w=0&k=20&c=5yy6ncoY2JjqBtIQszD8fFHyV0PYkBtJYPTCIfRpvVA="
    },
    {
        "_id": "6343453d3f4278ff0e6a1396",
        "name": "Traditional food",
        "description": "Stick to the tradition!",
        "creationDate": "2022-10-09T22:03:41.544Z",
        "lastUpdateDate": "2022-12-11T00:13:43.511Z",
        "location": "633f0d09798d5c219b3d1d20",
        "__v": 0,
        "image": "https://www.chefspencil.com/wp-content/uploads/All-Aspects-of-German-Cuisine.jpg"
    },
    {
        "_id": "6391f4f638348b4f8be9fdf6",
        "name": "asd",
        "description": "sdsdsdsd",
        "creationDate": "2022-12-08T14:30:14.672Z",
        "lastUpdateDate": "2022-12-08T14:30:19.031Z",
        "location": "633f0d09798d5c219b3d1d20",
        "__v": 0
    }
]
```

### Add a new menu to a location
| Menus | /locations/{locationId}/menus/ |
|-------------|-------------|
| URL | /locations/{locationId}/menus/ |
| Method | POST |
| Parameters | Name (string), Image (string), Description (string) |
| HTTP responses | 201 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, admin |

#### Example
Example Request: POST /locations/633f0d09798d5c219b3d1d20/menus

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "name": "Traditional food",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Stick to the tradition!"
}
```

Example Response: 201 Created

Example Response Body: 
```
{
    "name": "Traditional food",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Stick to the tradition!",
    "creationDate": "2022-12-11T21:40:25.747Z",
    "lastUpdateDate": "2022-12-11T21:40:25.747Z",
    "location": "633f0d09798d5c219b3d1d20",
    "_id": "63964e49a2d927f3f270eed2",
    "__v": 0
}
```

### Get a single menu of a certain location
| Menus | /locations/{locationId}/menus/{menuId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId} |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

#### Example
Example Request: GET /locations/633f0d09798d5c219b3d1d20/menus/63964e49a2d927f3f270eed2


Example Response: 200 OK

Example Response Body: 
```
{
    "_id": "63964e49a2d927f3f270eed2",
    "name": "Traditional food",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Stick to the tradition!",
    "creationDate": "2022-12-11T21:40:25.747Z",
    "lastUpdateDate": "2022-12-11T21:40:25.747Z",
    "location": "633f0d09798d5c219b3d1d20",
    "__v": 0
}
```

### Delete a menu of a certain location
| Menus | /locations/{locationId}/menus/{menuId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

#### Example
Example Request: DELETE /locations/633f0d09798d5c219b3d1d20/menus/63964e49a2d927f3f270eed2

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```


Example Response: 200 OK

Example Response Body: 
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```

### Update a menu of a certain location
| Menus | /locations/{locationId}/menus/{menuId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId} |
| Method | PATCH |
| Parameters | Name (string), Image (string), Description (string) |
| HTTP responses | 200 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

#### Example
Example Request: PATCH /locations/633f0d09798d5c219b3d1d20/menus/63964e49a2d927f3f270eed2

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "name": "Traditional food",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Stick to the tradition!"
}
```

Example Response: 200 OK

Example Response Body: 
```
{
    "name": "Traditional food",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Stick to the tradition!",
    "creationDate": "2022-12-11T21:40:25.747Z",
    "lastUpdateDate": "2022-12-11T21:40:25.747Z",
    "location": "633f0d09798d5c219b3d1d20",
    "_id": "63964e49a2d927f3f270eed2",
    "__v": 0
}
```

## Dishes

### Get all dishes of a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

#### Example
Example Request: GET /locations/633f0d09798d5c219b3d1d20/menus/634344dd3f4278ff0e6a1394/dishes


Example Response: 200 OK

Example Response Body: 
```
[
    {
        "_id": "634347a9b7909c7f9b626d43",
        "name": "Sushi 1",
        "description": "Some fish and some rice",
        "price": {
            "$numberDecimal": "3.11"
        },
        "menu": "634344dd3f4278ff0e6a1394",
        "__v": 0,
        "image": "https://media.healthyfood.com/wp-content/uploads/2017/03/Sushi_in_10_steps.jpg"
    },
    {
        "_id": "634347b5b7909c7f9b626d45",
        "name": "Sushi 2",
        "description": "Cucumber and rice",
        "price": {
            "$numberDecimal": "2.09"
        },
        "menu": "634344dd3f4278ff0e6a1394",
        "__v": 0,
        "image": "https://www.mashed.com/img/gallery/easy-cucumber-roll-recipe/l-intro-1634129609.jpg"
    }
]
```

### Add a dish to a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes |
| Method | POST |
| Parameters | Name (string), Image (string), Description (string), Price (string) |
| HTTP responses | 200 - success, 400 - wrong arguments, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, admin |

#### Example
Example Request: POST /locations/633f0d09798d5c219b3d1d20/menus/634344dd3f4278ff0e6a1394/dishes

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "name": "Chicken",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Very tasty chicken",
    "price": 3.09
}
```

Example Response: 201 Created

Example Response Body: 
```
{
    "name": "Chicken",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Very tasty chicken",
    "price": {
        "$numberDecimal": "3.09"
    },
    "menu": "634344dd3f4278ff0e6a1394",
    "_id": "639650d753c381f5ed3def2f",
    "__v": 0
}
```

### Get a dish from a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

#### Example
Example Request: GET /locations/633f0d09798d5c219b3d1d20/menus/63964e49a2d927f3f270eed2/dishes/639650d753c381f5ed3def2f


Example Response: 200 OK

Example Response Body: 
```
{
    "_id": "639650d753c381f5ed3def2f",
    "name": "Chicken",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Very tasty chicken",
    "price": {
        "$numberDecimal": "3.09"
    },
    "menu": "634344dd3f4278ff0e6a1394",
    "__v": 0
}
```

### Delete a dish from a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

#### Example
Example Request: DELETE /locations/633f0d09798d5c219b3d1d20/menus/63964e49a2d927f3f270eed2/dishes/639650d753c381f5ed3def2f

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```


Example Response: 200 OK

Example Response Body: 
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```

### Update a dish of a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
| Method | PATCH |
| Parameters | Name (string), Image (string), Description (string), Price (string) |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

#### Example
Example Request: PATCH /locations/633f0d09798d5c219b3d1d20/menus/63964e49a2d927f3f270eed2/dishes/639650d753c381f5ed3def2f

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "name": "Chicken",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Very tasty chicken",
    "price": 3.09
}
```

Example Response: 200 OK

Example Response Body: 
```
{
    "_id": "639650d753c381f5ed3def2f",
    "name": "Chicken",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Very tasty chicken",
    "price": {
        "$numberDecimal": "3.09"
    },
    "menu": "634344dd3f4278ff0e6a1394",
    "__v": 0
}
```

## Orders

### Get all orders of a user
| Orders | /users/:userId/orders |
|-------------|-------------|
| URL | /users/:userId/orders |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, same user whose order it is |

#### Example
Example Request: GET /users/6362c5992336780314bc384a/orders/


Example Response: 200 OK

Example Response Body: 
```
[
    {
        "_id": "63717c2829f112e502e8875c",
        "user": {
            "_id": "6362c5992336780314bc384a",
            "email": "admin@gmail.com",
            "username": "admin",
            "password": "$2b$10$kRq.rE9IfROwqusl0OALPuBNiM.AKT.LDi.sZuKE/5yHISU4hqUEm",
            "joinDate": "2022-11-02T19:31:37.001Z",
            "lastJoinDate": "2022-12-11T21:54:18.179Z",
            "role": "Admin",
            "__v": 0
        },
        "dishes": [
            {
                "_id": "634347a9b7909c7f9b626d43",
                "name": "Sushi 1",
                "description": "Some fish and some rice",
                "price": {
                    "$numberDecimal": "3.11"
                },
                "menu": "634344dd3f4278ff0e6a1394",
                "__v": 0,
                "image": "https://media.healthyfood.com/wp-content/uploads/2017/03/Sushi_in_10_steps.jpg"
            },
            {
                "_id": "634347b5b7909c7f9b626d45",
                "name": "Sushi 2",
                "description": "Cucumber and rice",
                "price": {
                    "$numberDecimal": "2.09"
                },
                "menu": "634344dd3f4278ff0e6a1394",
                "__v": 0,
                "image": "https://www.mashed.com/img/gallery/easy-cucumber-roll-recipe/l-intro-1634129609.jpg"
            }
        ],
        "paid": false,
        "completed": false,
        "__v": 0
    },
    {
        "_id": "63717d9fbcf436b9c16dcfec",
        "user": {
            "_id": "6362c5992336780314bc384a",
            "email": "admin@gmail.com",
            "username": "admin",
            "password": "$2b$10$kRq.rE9IfROwqusl0OALPuBNiM.AKT.LDi.sZuKE/5yHISU4hqUEm",
            "joinDate": "2022-11-02T19:31:37.001Z",
            "lastJoinDate": "2022-12-11T21:54:18.179Z",
            "role": "Admin",
            "__v": 0
        },
        "dishes": [
            {
                "_id": "634347a9b7909c7f9b626d43",
                "name": "Sushi 1",
                "description": "Some fish and some rice",
                "price": {
                    "$numberDecimal": "3.11"
                },
                "menu": "634344dd3f4278ff0e6a1394",
                "__v": 0,
                "image": "https://media.healthyfood.com/wp-content/uploads/2017/03/Sushi_in_10_steps.jpg"
            },
            {
                "_id": "634347b5b7909c7f9b626d45",
                "name": "Sushi 2",
                "description": "Cucumber and rice",
                "price": {
                    "$numberDecimal": "2.09"
                },
                "menu": "634344dd3f4278ff0e6a1394",
                "__v": 0,
                "image": "https://www.mashed.com/img/gallery/easy-cucumber-roll-recipe/l-intro-1634129609.jpg"
            }
        ],
        "paid": false,
        "completed": false,
        "__v": 0
    }
]
```

### Add a new order for a user
| Orders | /users/:userId/orders |
|-------------|-------------|
| URL | /users/:userId/orders |
| Method | POST |
| Parameters | Dishes (Array of Dish), Paid (Boolean), Completed (Boolean) |
| HTTP responses | 201 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, same user whose order it is |

#### Example
Example Request: POST /users/6362c5992336780314bc384a/orders/

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "dishes": ["634347a9b7909c7f9b626d43", "634347b5b7909c7f9b626d45"],
    "paid": false,
    "completed": true
}
```

Example Response: 201 Created

Example Response Body: 
```
{
    "user": "6362c5992336780314bc384a",
    "dishes": [
        "634347a9b7909c7f9b626d43",
        "634347b5b7909c7f9b626d45"
    ],
    "paid": false,
    "completed": false,
    "_id": "6396520653c381f5ed3def46",
    "__v": 0
}
```

### Get an order of a user
| Orders | /users/:userId/orders/{orderId} |
|-------------|-------------|
| URL | /users/:userId/orders/{orderId}} |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, same user whose order it is |

#### Example
Example Request: GET /users/6362c5992336780314bc384a/orders/6396520653c381f5ed3def46

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Response: 200 OK

Example Response Body: 
```
{
    "_id": "639650d753c381f5ed3def2f",
    "name": "Chicken",
    "image": "https://i.imgur.com/JeZT04a.png",
    "description": "Very tasty chicken",
    "price": {
        "$numberDecimal": "3.09"
    },
    "menu": "634344dd3f4278ff0e6a1394",
    "__v": 0
}
```

### Delete an order of a user
| Orders | /users/:userId/orders/{orderId} |
|-------------|-------------|
| URL | /users/:userId/orders/{orderId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, same user whose order it is |

#### Example
Example Request: DELETE /users/6362c5992336780314bc384a/orders/6396520653c381f5ed3def46

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```


Example Response: 200 OK

Example Response Body: 
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```

### Update an order of a user
| Orders | /users/:userId/orders/{orderId} |
|-------------|-------------|
| URL | /users/:userId/orders/{orderId} |
| Method | PATCH |
| Parameters | Dishes (Array of Dish), Paid (Boolean), Completed (Boolean) |
| HTTP responses | 200 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, same user whose order it is |

#### Example
Example Request: PATCH /users/6362c5992336780314bc384a/orders/6396520653c381f5ed3def46

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "dishes": ["634347a9b7909c7f9b626d43", "634347b5b7909c7f9b626d45"],
    "paid": false,
    "completed": true
}
```

Example Response: 200 OK

Example Response Body: 
```
{
    "user": "6362c5992336780314bc384a",
    "dishes": [
        "634347a9b7909c7f9b626d43",
        "634347b5b7909c7f9b626d45"
    ],
    "paid": false,
    "completed": false,
    "_id": "6396520653c381f5ed3def46",
    "__v": 0
}
```

## Users

### Get all users
| Users | /users/ |
|-------------|-------------|
| URL | /users/ |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

#### Example
Example Request: GET /users/


Example Response: 200 OK

Example Response Body: 
```
[
    {
        "_id": "6362b9f231cd11f1aec6d9c2",
        "email": "user@gmail.com",
        "username": "user",
        "joinDate": "2022-11-02T18:41:54.869Z",
        "lastJoinDate": "2022-12-11T21:30:23.323Z",
        "role": "User",
        "__v": 0
    },
    {
        "_id": "6362c5992336780314bc384a",
        "email": "admin@gmail.com",
        "username": "admin",
        "joinDate": "2022-11-02T19:31:37.001Z",
        "lastJoinDate": "2022-12-11T22:16:00.943Z",
        "role": "Admin",
        "__v": 0
    },
    {
        "_id": "6390a72ce8510a833d6d9292",
        "email": "newtest@gmail.com",
        "username": "newtest",
        "joinDate": "2022-12-07T14:46:04.161Z",
        "lastJoinDate": "2022-12-07T14:46:04.161Z",
        "role": "User",
        "__v": 0
    }
]
```

### Register
| Users | /users/ |
|-------------|-------------|
| URL | /users/ |
| Method | POST |
| Parameters | Email (string), Username (string), Password (string) |
| HTTP responses | 201 - success, 400 - wrong parameters |
| Requires authentication | No |

#### Example
Example Request: POST /users/

Example Request Body:
```
{
    "email": "newtest1@gmail.com",
    "username": "newtest1",
    "password": "asdasd"
}
```

Example Response: 201 Created

Example Response Body: 
```
{
    "message": "User created successfully",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld3Rlc3QxQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibmV3dGVzdDEiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3MDc5NzA0MywiZXhwIjoxNjcwNzk3NjQzfQ.d7zC4pNCAauOkVrk2g_xdP50YOWj9vtrC0mM6Rlthb8",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld3Rlc3QxQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibmV3dGVzdDEiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3MDc5NzA0M30.9-fQwPNIHRKOdf2ABKSpCXFwBUJ96nV4AdWOpRUJk2Q"
}
```

### Update user role
| Users | /users/{userId}/roles |
|-------------|-------------|
| URL | /users/{userId}/roles |
| Method | PATCH |
| Parameters | Role (string (User or Admin)) |
| HTTP responses | 200 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

#### Example
Example Request: PATCH /users/6362c5992336780314bc384a/roles/

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "role": "Admin,
}
```

Example Response: 200 OK

Example Response Body: 
```
{
    "email": "admin@gmail.com",
    "joinDate": "2022-11-02T19:31:37.001Z",
    "lastJoinDate": "2022-12-11T22:16:00.943Z",
    "role": "Admin",
    "username": "admin"
}
```

## Tokens

### Login
| Tokens | /tokens/ |
|-------------|-------------|
| URL | /tokens/ |
| Method | POST |
| Parameters | Email (string), Password (string) |
| HTTP responses | 201 - success, 400 - wrong parameters, 404 - not found |
| Requires authentication | No |

#### Example
Example Request: POST /tokens/

Example Request Body:
```
{
    "email": "admin@gmail.com",
    "password": "asdasd"
}
```

Example Response: 201 Created

Example Response Body: 
```
{
    "message": "Logged in successfully",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTc2MTIsImV4cCI6MTY3MDc5ODIxMn0.K5qfZ-YepEOlbeF0C1VMdUOhm2I2ZtSPADfG8H4U728",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTc2MTJ9.-Gk1IWV-e47aiZVXSKjXQKJjUBFdN9KWUoJMiV1zlpU"
}
```

### Refresh token
| Tokens | /tokens/ |
|-------------|-------------|
| URL | /tokens/ |
| Method | PUT |
| Parameters | Token (String) |
| HTTP responses | 201 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, any user |

#### Example
Example Request: PUT /tokens/

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Request Body:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTc2MTJ9.-Gk1IWV-e47aiZVXSKjXQKJjUBFdN9KWUoJMiV1zlpU"
}
```

Example Response: 201 Created

Example Response Body: 
```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTc3MDgsImV4cCI6MTY3MDc5ODMwOH0.VG-e-rKcuooBUeQIsaBWoi0fmrZMbr5Pb7ldrp5Phis"
}
```

### Logout
| Tokens | /tokens/{token}/users/{userId} |
|-------------|-------------|
| URL | /tokens/{token}/users/{userId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | Yes, any user |

#### Example
Example Request: DELETE /tokens/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ1c2VyIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY3NDE3MzIxfQ.d4-STUFqPnLctJsA7qovMGuby1-rsOj6-TAOU5XnOvU/users/6362c5992336780314bc384a

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```


Example Response: 200 OK

Example Response Body: 
```
{
    "acknowledged": true,
    "deletedCount": 1
}
```

## User Ids

### Get user id by username
| User Ids | users/{userName}/userIds |
|-------------|-------------|
| URL | users/{userName}/userIds |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 400 - wrong parameters, 404 - not found |
| Requires authentication | Yes, user of which getting the id |

#### Example
Example Request: GET /users/admin/userIds

Example Request Headers: 
```
Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NzA3OTQyMjcsImV4cCI6MTY3MDc5NDgyN30.x5k604ShaaU1ODtH0OTQ7y3mB41HZX_pXC0L5RObTjw
```

Example Response: 200 OK

Example Response Body: 
```
"6362c5992336780314bc384a"
```
</details>