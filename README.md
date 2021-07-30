

# Api

## TODO

- [ ] 根据用户发送notes
- [ ] 获取notes需要登录用户 

## 1. User
> user system

1. **POST** `/login`
> user login

req
-----------
username  string // username
passwd    string // password

res 
-----------


2. **POST** `/register`
> user sign up

req
-----------

res 
-----------

3. **POST** `/token`
> refresh token / token login

req
-----------

res 
-----------
-----------

4. **POST** `/logout`
> user logout

req
-----------

res 
-----------

## 2. notes
> sms record

1. **GET** `/notes`
> get record

req
-----------

res 
-----------
> sms record

2. **POST** `/notes`
> add record

req
-----------

res 
-----------

3. **GET** `/notes/simple`
> get record readable

req
-----------
limit int // count of record

res 
-----------
HTML


## 3. notification
> phone notification record

1. **POST** `/notification`
> add record

req
-----------
title     string *
message   string *

res 
-----------

1. **GET** `/notification`
> add record

req
-----------
limit     int

res 
-----------

