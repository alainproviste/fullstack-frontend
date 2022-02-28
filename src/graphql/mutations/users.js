import gql from "graphql-tag";

export const updateUser = gql`
    mutation updateUser($firstName:String, $lastName:String){
        updateUser(firstName: $firstName, lastName: $lastName) {
            firstName,
            lastName
        }
    }
`