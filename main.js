(()=>{"use strict";const e={baseUrl:"https://nomoreparties.co/v1/cohort-mag-4/",headers:{authorization:"0019c1a3-1ad9-41dd-9377-34d72316aa0a","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}function r(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}function o(e,t){let{handleDeleteCard:n,handleLikeClick:r,handleImageClick:o,userId:c}=t;const a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),s=a.querySelector(".card__image"),l=a.querySelector(".card__title"),u=a.querySelector(".card__delete-button"),i=a.querySelector(".card__like-button"),d=document.createElement("span");d.classList.add("card__like-count"),d.textContent=e.likes.length,i.after(d),l.textContent=e.name,s.src=e.link,s.alt=e.name;const p=e.owner._id===c;p||u.remove();const _=e.likes.some((e=>e._id===c));return _&&i.classList.add("card__like-button_is-active"),p&&u.addEventListener("click",(()=>n(a,e._id))),i.addEventListener("click",(()=>{r(i,e._id,d,_).then((t=>{e.isLiked=t})).catch((e=>console.error("Ошибка при обработке лайка:",e)))})),s.addEventListener("click",(()=>o(e))),a}function c(e){if("Escape"===e.key){const e=document.querySelector(".popup_is-opened");e&&s(e)}}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function l(e,t,n){const r=e.querySelector(".".concat(t.id,"-error"));r.textContent="",r.classList.remove(n.errorClass),t.classList.remove(n.inputErrorClass)}function u(e,t){const n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((n=>{l(e,n,t)})),r.disabled=!0,r.classList.add(t.inactiveButtonClass)}document.querySelector("#card-template");const i=document.querySelector(".places__list"),d=document.querySelector(".profile__image"),p=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_image"),h=document.querySelector(".popup_type_avatar"),y=document.querySelector(".profile__edit-button"),f=document.querySelector(".profile__add-button"),v=p.querySelector(".popup__form"),S=_.querySelector(".popup__form"),C=h.querySelector(".popup__form"),b=v.querySelector(".popup__input_type_name"),q=v.querySelector(".popup__input_type_description"),k=S.querySelector(".popup__input_type_card-name"),L=S.querySelector(".popup__input_type_url"),E=C.querySelector(".popup__input_type_url"),g=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),U=m.querySelector(".popup__image"),A=m.querySelector(".popup__caption"),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};let I;function T(e){U.src=e.link,U.alt=e.name,A.textContent=e.name,a(m)}function B(n,r){(function(n,r){return function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(r).then((()=>{n.remove()}))})(n,r).catch((e=>{console.error("Ошибка при удалении карточки:",e)}))}function P(e,t,o,c){return function(e,t,o,c){return(c?r:n)(t).then((t=>(e.classList.toggle("card__like-button_is-active"),o.textContent=t.likes.length,!c)))}(e,t,o,c).catch((e=>(console.error("Ошибка при обновлении лайка:",e),c)))}y.addEventListener("click",(function(){b.value=g.textContent,q.value=x.textContent,u(v,D),a(p)})),f.addEventListener("click",(function(){S.reset(),u(S,D),a(_)})),v.addEventListener("submit",(function(n){n.preventDefault();const r=n.submitter,o=r.textContent;var c,a;r.textContent="Сохранение...",(c=b.value,a=q.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:c,about:a})}).then(t)).then((e=>{g.textContent=e.name,x.textContent=e.about,s(p)})).catch((e=>{console.error("Ошибка при обновлении профиля:",e)})).finally((()=>{r.textContent=o}))})),S.addEventListener("submit",(function(n){n.preventDefault();const r=n.submitter,c=r.textContent;var a,l;r.textContent="Сохранение...",(a=k.value,l=L.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:l})}).then(t)).then((e=>{const t=o(e,{handleDeleteCard:B,handleLikeClick:P,handleImageClick:T,userId:I});i.prepend(t),S.reset(),s(_)})).catch((e=>{console.error("Ошибка при добавлении карточки:",e)})).finally((()=>{r.textContent=c}))})),C.addEventListener("submit",(function(n){n.preventDefault();const r=n.submitter,o=r.textContent;var c;r.textContent="Сохранение...",(c=E.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:c})}).then(t)).then((e=>{d.style.backgroundImage="url(".concat(e.avatar,")"),s(h)})).catch((e=>{console.error("Ошибка при обновлении аватара:",e)})).finally((()=>{r.textContent=o}))})),d.addEventListener("click",(()=>{C.reset(),u(C,D),a(h)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(t=>{(t.target===e||t.target.classList.contains("popup__close"))&&s(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((t=>{!function(e,t){const n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((o=>{o.addEventListener("input",(()=>{!function(e,t,n){t.validity.valid?l(e,t,n):function(e,t,n,r){const o=e.querySelector(".".concat(t.id,"-error"));o.textContent=n,o.classList.add(r.errorClass),t.classList.add(r.inputErrorClass)}(e,t,t.dataset.errorMessage||t.validationMessage,n)}(e,o,t),function(e,t,n){const r=e.some((e=>!e.validity.valid));t.disabled=r,t.classList.toggle(n.inactiveButtonClass,r)}(n,r,t)}))}))}(t,e)}))}(D),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((e=>{let[t,n]=e;I=t._id,g.textContent=t.name,x.textContent=t.about,d.style.backgroundImage="url(".concat(t.avatar,")"),n.forEach((e=>{const t=o(e,{handleDeleteCard:B,handleLikeClick:P,handleImageClick:T,userId:I});i.append(t)}))})).catch((e=>{console.error("Ошибка при загрузке данных:",e)}))})();