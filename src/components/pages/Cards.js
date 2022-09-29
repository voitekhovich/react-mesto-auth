import React from "react";

import Main from "../Main";
import Footer from "../Footer";
import ImagePopup from "../ImagePopup";

import { api } from "../../utils/Api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup";
import DelPlacePopup from "../DelPlacePopup";
import Loader from "../Loader";
import CardsHeader from "../CardsHeader";

export default function Cards(props) {
  const { onTokenCheck, email, onSignOut } = props;

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDelPlacePopupOpen, setIsDelPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedDelCard, setSelectedDelCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleDelPlaceClick = (card) => {
    setIsDelPlacePopupOpen(true);
    setSelectedDelCard(card);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDelPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };

  const handleUpdateUser = (userData) => {
    setIsLoading(true);
    api
      .setUserInfo(userData)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    setIsLoading(true);
    const card = selectedDelCard;
    api
      .delCard(card._id)
      .then((result) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
        setSelectedDelCard({});
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    setIsLoading(true);
    onTokenCheck();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <React.Fragment>
      <CardsHeader email={email} onSignOut={onSignOut} />

      <CurrentUserContext.Provider value={currentUser}>
        {isLoading ? (
          <div className="page__loader">
            <Loader />
          </div>
        ) : (
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDelPlaceClick}
          />
        )}

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        <DelPlacePopup
          onDelPlace={handleCardDelete}
          isOpen={isDelPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
      </CurrentUserContext.Provider>
      <Footer />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        name="imagebox"
      />
    </React.Fragment>
  );
}
