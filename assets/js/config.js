export const firebaseConfig = {
    apiKey: "AIzaSyBVkDmkQWWcZjLUsWOhzNpjs7AY1vAYqWI",
    authDomain: "portfolio-backend-48826.firebaseapp.com",
    projectId: "portfolio-backend-48826"
};

//const ENV = "local"; // Cambia in "prod" quando fai il deploy
const ENV = "prod";

const ENDPOINTS = {
  local: {
    BACKEND_BASE: "http://localhost:8080"
  },
  prod: {
    BACKEND_BASE: "https://spring-portfolio-backend-1-0-0.onrender.com"
  }
};

function getEndpoint(key) {
  const envEndpointsBase = ENV === "prod" ? ENDPOINTS.prod : ENDPOINTS.local;
  let retEndpoint = `${envEndpointsBase.BACKEND_BASE}`;

  if (key !== undefined) {
      if (!ENDPOINT_PATHS[key]) {
          throw new Error(`Endpoint non trovato per la chiave: ${key}`);
      }
      retEndpoint += ENDPOINT_PATHS[key];
  }

  return retEndpoint;
}

export { getEndpoint, ENV };
