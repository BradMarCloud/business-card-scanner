import { gql } from "@apollo/client";

export const MUTATION_Login_User = gql`
  mutation MUTATION_User($username: String!, $domainName: String!) {
    user(username: $username, domainName: $domainName) {
      token
      user {
        _id
        username
        firstName
        lastName
        creditsUsedMonthly
        creditsUsedTotal
        code
        lastLogin
        createdDate
      }
      accountAppInfo {
        _id
        accountName
        credentials {
          buid
          clientId
          clientSecret
          redirectUrl
          version
        }
        customFields {
          _id
          fieldSystemName
          fieldLabel
          dataType
          required
          maxLength
        }
        domainName
        totalCredits
        totalCreditsUsedMonthly
      }
    }
  }
`;

export const MUTATION_UpdateAppUsersCredits = gql`
mutation MUTATION_UpdateAppUsersCredits {
  updateAppUsersCredits {
    creditsUsedMonthly
    creditsUsedTotal
    totalCreditsUsedMonthly
    totalCredits
  }
}
`;
