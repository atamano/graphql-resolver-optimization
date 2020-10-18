# Graphql Resolver Optimization

This is a repository example of resolvers optimization in GraphQL to avoid overfetching.

## Setup

```
$ yarn install
$ yarn dev
```

=> go to `http://localhost:/8080/graphql`

## Example 1

Run below query in playground:

```
query {
  user(id: 2) {
    id
    cars {
      id
      model
      registration_plate
    }
  }
}
```

This query should never fetch `/users` endpoint, only one endpoint is called to get user cars.

## Example 2

```
query {
  users {
    id
    firstName
    lastName
    cars {
      id
      model
      registration_plate
    }
  }
}

```

This query should end up in only 2 API calls:

```
/users
/cars?ids[]=XXX&ids[]=YYY
```

## Example 3

```
query {
  user(id: 1) {
    id
    firstName
    lastName
    cars {
      id
      model
      registration_plate
    }
  }
}

```

This query should end up in only 2 API calls:

```
/users?ids[]=1
/users/1/cars
```

You can find all query examples in `exemples` directory.
