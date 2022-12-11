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

## Locations

### Get all locations
| Locations | /locations/ |
|-------------|-------------|
| URL | /locations/ |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |
| Example URL | GET /locations/ |
| Example Body | <!-- --> |

Example Response: 200 OK

Example Response Body: 

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

### Add a new location
| Locations | /locations/ |
|-------------|-------------|
| URL | /locations/ |
| Method | POST |
| Parameters | Country (string), City (string), Address (string) |
| HTTP responses | 201 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, admin |

### Get a location
| Locations | /locations/{locationId} |
|-------------|-------------|
| URL | /locations/{locationId} |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

### Delete a location
| Locations | /locations/{locationId} |
|-------------|-------------|
| URL | /locations/{locationId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, admin |

### Update a location
| Locations | /locations/{locationId} |
|-------------|-------------|
| URL | /locations/{locationId} |
| Method | PATCH |
| Parameters | Country (string), City (string), Address (string) |
| HTTP responses | 200 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

## Menus

### Get all menus of a certain location
| Menus | /locations/{locationId}/menus/ |
|-------------|-------------|
| URL | /locations/{locationId}/menus/ |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

### Add a new menu to a location
| Menus | /locations/{locationId}/menus/ |
|-------------|-------------|
| URL | /locations/{locationId}/menus/ |
| Method | POST |
| Parameters | Name (string), Image (string), Description (string) |
| HTTP responses | 201 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, admin |

### Get a single menu of a certain location
| Menus | /locations/{locationId}/menus/{menuId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId} |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

### Delete a menu of a certain location
| Menus | /locations/{locationId}/menus/{menuId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

### Update a menu of a certain location
| Menus | /locations/{locationId}/menus/{menuId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId} |
| Method | PATCH |
| Parameters | Name (string), Image (string), Description (string) |
| HTTP responses | 200 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

## Dishes

### Get all dishes of a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

### Add a dish to a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes |
| Method | POST |
| Parameters | Name (string), Image (string), Description (string), Price (string) |
| HTTP responses | 200 - success, 400 - wrong arguments, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, admin |

### Get a dish from a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | No |

### Delete a dish from a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

### Update a dish of a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
| Method | PATCH |
| Parameters | Name (string), Image (string), Description (string), Price (string) |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

## Orders

### Get all orders of a user
| Orders | /users/:userId/orders |
|-------------|-------------|
| URL | /users/:userId/orders |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, same user whose order it is |

### Add a new order for a user
| Orders | /users/:userId/orders |
|-------------|-------------|
| URL | /users/:userId/orders |
| Method | POST |
| Parameters | Dishes (Array of Dish), Paid (Boolean), Completed (Boolean) |
| HTTP responses | 201 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, same user whose order it is |

### Get an order of a user
| Orders | /users/:userId/orders/{orderId} |
|-------------|-------------|
| URL | /users/:userId/orders/{orderId}} |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, same user whose order it is |

### Delete an order of a user
| Orders | /users/:userId/orders/{orderId} |
|-------------|-------------|
| URL | /users/:userId/orders/{orderId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, same user whose order it is |

### Update an order of a user
| Orders | /users/:userId/orders/{orderId} |
|-------------|-------------|
| URL | /users/:userId/orders/{orderId} |
| Method | PATCH |
| Parameters | Dishes (Array of Dish), Paid (Boolean), Completed (Boolean) |
| HTTP responses | 200 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden |
| Requires authentication | Yes, same user whose order it is |

## Users

### Get all users
| Users | /users/ |
|-------------|-------------|
| URL | /users/ |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

### Register
| Users | /users/ |
|-------------|-------------|
| URL | /users/ |
| Method | POST |
| Parameters | Email (string), Username (string), Password (string) |
| HTTP responses | 201 - success, 400 - wrong parameters |
| Requires authentication | No |

### Update user role
| Users | /users/{userId}/roles |
|-------------|-------------|
| URL | /users/{userId}/roles |
| Method | PATCH |
| Parameters | Role (string (User or Admin)) |
| HTTP responses | 200 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, admin |

## Tokens

### Login
| Tokens | /tokens/ |
|-------------|-------------|
| URL | /tokens/ |
| Method | POST |
| Parameters | Email (string), Password (string) |
| HTTP responses | 201 - success, 400 - wrong parameters, 404 - not found |
| Requires authentication | No |

### Refresh token
| Tokens | /tokens/ |
|-------------|-------------|
| URL | /tokens/ |
| Method | PUT |
| Parameters | Token (String) |
| HTTP responses | 201 - success, 400 - wrong parameters, 401 - not authorized, 403 - forbidden, 404 - not found |
| Requires authentication | Yes, any user |

### Logout
| Tokens | /tokens/{token}/users/{userId} |
|-------------|-------------|
| URL | /tokens/{token}/users/{userId} |
| Method | DELETE |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | Yes, any user |

## User Ids

### Get user id by username
| User Ids | users/{userName}/userIds |
|-------------|-------------|
| URL | users/{userName}/userIds |
| Method | GET |
| Parameters | <!-- --> |
| HTTP responses | 200 - success, 400 - wrong parameters, 404 - not found |
| Requires authentication | Yes, user of which getting the id |