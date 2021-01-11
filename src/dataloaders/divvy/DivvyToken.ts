export interface DivvyToken {
  iss: string
  sub: string
  aud: string
  iat: number
  exp: number
  azp: string
  scope: string
}

export interface DivvyTokenAndSignedString {
  token: DivvyToken
  signedString: string
}
