# 后端设计

## 图片存储问题

我们的后端需要存储一些图片（包括用户头像，游记封面和游记中的图片）

我们前端会发送一个特定的请求，比如 `get /users/avatar/:username` 来获取用户头像，我们后端需要返回这个用户的头像。而在这个过程中，需要通过 `username` 来获取用户头像的具体存放地址，因此需要一个映射，即 `username -> file://path_to_project/public/avatar/hashed_file_name`。

由此可知，我们在上传用户头像的时候，`post /users/avatar`，我们从 form 中获取图片文件后，需要将其存储到 `public/avatar` 目录下，并且需要将 `username` 和 `hashed_file_name` 的映射存储到数据库中。

那么前端是如何知道他需要请求哪个接口呢？当加载游记列表的页面的时候，我们可以获取一个游记列表的数组，而其中的每一项都会有一个 `author` 字段（详情见数据库设计），然后我们设置一个 loader 函数，请求地址就可以通过拼接字符串的形式实现 `http://localhost:3000/${loader()}/:author`，同理
