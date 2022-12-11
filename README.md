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

### Add a new location
| Locations | /locations/ |
|-------------|-------------|
| URL | /locations/ |
| Method | POST |
| Parameters | Country (string), City (string), Address (string) |
| HTTP responses | 201 - success, 400 - wrong parameters |
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
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | Yes, admin |

### Update a location
| Locations | /locations/{locationId} |
|-------------|-------------|
| URL | /locations/{locationId} |
| Method | PATCH |
| Parameters | Country (string), City (string), Address (string) |
| HTTP responses | 200 - success, 400 - wrong parameters 404 - not found |
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
| HTTP responses | 201 - success, 400 - wrong parameters |
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
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | Yes, admin |

### Update a menu of a certain location
| Menus | /locations/{locationId}/menus/{menuId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId} |
| Method | PATCH |
| Parameters | Name (string), Image (string), Description (string) |
| HTTP responses | 200 - success, 400 - wrong parameters, 404 - not found |
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
| HTTP responses | 200 - success, 400 - wrong arguments |
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
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | Yes, admin |

### Update a dish of a certain menu of a certain location
| Dishes | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
|-------------|-------------|
| URL | /locations/{locationId}/menus/{menuId}/dishes/{dishId} |
| Method | PATCH |
| Parameters | Name (string), Image (string), Description (string), Price (string) |
| HTTP responses | 200 - success, 404 - not found |
| Requires authentication | Yes, admin |

## Orders

