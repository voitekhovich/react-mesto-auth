import { baseUrl, headers } from "./constants.js";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  _request(url, options) {
    return fetch(this._baseUrl + url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request("/users/me", {
      headers: this._headers,
    });
  }

  setUserInfo(userData) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
  }

  setUserAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  getInitialCards() {
    return this._request("/cards", {
      headers: this._headers,
    });
  }

  addCard(card) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  delCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  delLikes(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) return this.setLike(cardId);
    return this.delLikes(cardId);
  }
}

export const api = new Api({ baseUrl, headers });
