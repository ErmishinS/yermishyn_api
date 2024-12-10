# Тестування працездатності системи

Тестування сервісу у Postman.

---

## Сценарії для користувача (User)

### POST api/user

<img src="./media/user_create.png">

### GET api/user

<img src="./media/users_get.png">

### GET api/user/:id

<img src="./media/user_get.png">

### PATCH api/user/:id

<img src="./media/user_update.png">

### DELETE api/user/:id

<img src="./media/user_delete.png">

## Сценарії для медіа контенту (Media Content)

### POST api/content

<img src="./media/content_create.png">

### GET api/content

<img src="./media/contents_get.png">

### GET api/content/:id

<img src="./media/content_get.png">

### PATCH api/content/:id

<img src="./media/content_update.png">

### DELETE api/content/:id

<img src="./media/content_delete.png">

## Виключні сценарії для користувача (User Exceptions)

### EXCEPTION(User): Not Enough Fields

<img src="./media/user_NotEnoughFields.png">

### EXCEPTION(User): Already Registered 

<img src="./media/user_AlreadyRegistered.png">

### EXCEPTION(User): User Not Found

<img src="./media/user_UserNotFound.png">

## Виключні сценарії для медіа контенту (Media Content Exceptions)

### EXCEPTION(MediaContent): Not Enough Fields

<img src="./media/content_NotEnoughFields.png">

### EXCEPTION(MediaContent): Media Content Not Found

<img src="./media/content_MediaContentNotFound.png">