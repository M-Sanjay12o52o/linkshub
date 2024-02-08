# Queries

query GetPosts {
posts {
id
url
createdAt
title
updatedAt
}
}

query GetPost($id: ID!) {
post(id: $id) {
id
url
title
}
}

# Mutations

mutation AddPost($url: String, $title: String) {
addPost(url: $url, title: $title) {
createdAt
id
url
title
updatedAt
}
}

mutation UpdatePost($id: ID!, $title: String, $url: String) {
updatePost(id: $id, title: $title, url: $url) {
id
url
title
}
}

mutation DeletePost($id: ID!) {
deletePost(id: $id) {
id
title
url
}
}

mutation Vote($postId: ID!, $userId: ID!) {
vote(postId: $postId, userId: $userId) {
id
postId
userId
}
}
