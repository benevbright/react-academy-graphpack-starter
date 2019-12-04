```
# Write your query or mutation here
query {
  users {
    name
    email
    articles {
      title
    }
  }

  # articles {
  #   title
  #   author {
  #     name
  #   }
  # }

#   article(id:"ee083659-e00f-4c3f-a15e-6658f6c3d1d7"){
#     title
#     body
#   }

#   user(id: "2de64aea-165f-460e-8089-98439cbef541"){
#     name
#     email
#   }
}
```
