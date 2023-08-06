import jwt from "jsonwebtoken";
export interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface TokensState {
  success: boolean;
  message: string;
  tokens?: Tokens | null;
}

export interface SaveTokensState {
  success: boolean;
  message: string;
}

export function getTokensFromLocalStorage(): TokensState {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return {
      success: false,
      message: "Access token o refresh token no encontrados en localStorage",
      tokens: null,
    };
  }

  // Si el token de acceso ha expirado, se debe solicitar un nuevo token de acceso utilizando el token de actualización.
  const decodedAccessToken: any = jwt.decode(accessToken);
  const nowInSeconds = Date.now() / 1000;

  if (!decodedAccessToken || nowInSeconds > decodedAccessToken.exp) {
    return {
      success: false,
      message: "El token de acceso ha expirado",
      tokens: null,
    };
  }

  const tokens: any = {
    accessToken,
    refreshToken,
  };

  return {
    success: true,
    message: "Tokens obtenidos correctamente",
    tokens,
  };
}

export function saveTokensToLocalStorage(tokens: Tokens): SaveTokensState {
  if (!tokens.accessToken || !tokens.refreshToken) {
    return {
      success: false,
      message:
        "Los tokens de acceso y de actualización son necesarios para guardar en localStorage",
    };
  }

  try {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  } catch (error: any) {
    return {
      success: false,
      message: `Error al guardar los tokens en localStorage: ${error.message}`,
    };
  }

  return {
    success: true,
    message: "Tokens guardados correctamente en localStorage",
  };
}

export function clearTokens() {
  localStorage.clear();
}
