# 数据库设计

这里使用 MongoDB 作为数据库来

## 用户表

| 字段         | 类型     | 说明                            |
| ---------- | ------ | ----------------------------- |
| username   | string | 用户名                           |
| password   | string | 密码，需要加密后存储                    |
| nickname   | string | 昵称                            |
| avatar     | string | 头像，实际存储的是图像的 URL              |
| permission | int    | 权限，0 为游客，1 为用户，2 为审核人员，3 为管理员 |

## 游记

| 字段        | 类型         | 说明                              |
| --------- | ---------- | ------------------------------- |
| \_id      | int        | 游记的唯一标识                         |
| title     | string     | 游记的标题                           |
| content   | string     | 游记的内容                           |
| author    | string     | 作者的用户名，作为外键，对应一个唯一用户            |
| covers    | string\[\] | 游记的封面图片，实际存储的是图像的 URL           |
| review    | int        | 游记的审核状态，0 为未审核，1 为审核通过，2 为审核未通过 |
| msg       | string     | 游记审核附带信息                        |
| delete    | int        | 游记的逻辑删除状态，0 为未删除，1 为已删除         |
| time?     | Date       | 可选项，游记的发布时间                     |
| num_view? | int        | 可选项，游记的浏览次数                     |
| num_like? | int        | 可选项，游记的点赞次数                     |
| cost?     | int        | 可选项，游记的花费                       |
| location? | string     | 可选项，游记的地点                       |
