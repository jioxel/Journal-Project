export const initialState={
     status: 'checking', //'checking', 'not-authenticate', 'authenticate'
     uid: null,
     email:null,
     displayName:null,
     photoURL:null,
     errorMessage:null,
}
export const authenticatedState={
     status: 'authenticate', //'checking', 'not-authenticate', 'authenticate'
     uid: '123asd',
     email:'demo@demo.com',
     displayName:'Demo user',
     photoURL:'http://demo.com',
     errorMessage:null,
}

export const notAuthenticate={
     status: 'not-authenticate', //'checking', 'not-authenticate', 'authenticate'
     uid: null,
     email:null,
     displayName:null,
     photoURL:null,
     errorMessage:"No hay error",
}
export const demoUser={
     uid: '123asd',
     email:'demo@demo.com',
     displayName:'Demo user',
     photoURL:'http://demo.com'
}
