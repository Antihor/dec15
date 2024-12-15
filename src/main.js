import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchNews } from './js/api';
import { templateArticles } from './js/render';

const refs = {
  form: document.querySelector('.js-form'),
  list: document.querySelector('.js-list'),
  more: document.querySelector('.js-more'),
  loader: document.querySelector('.loader'),
};

let query;
let page;
let lastPage;

refs.form.addEventListener('submit', onSubmit);
refs.more.addEventListener('click', onMore);

async function onSubmit(ev) {
  ev.preventDefault();
  page = 1;

  query = ev.target.elements.query.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Error!',
      message: 'No query',
      position: 'center',
    });
  }
  refs.list.innerHTML = '';
  showLoader();
  const data = await fetchNews(query, page);
  lastPage = Math.ceil(data.totalresults / 10);
  hideLoader();
  renderNews(data.articles);
  checkMore();

  ev.target.reset();
}

async function onMore() {
  page += 1;
  const data = await fetchNews(query, page);
  showLoader();
  renderNews(data.articles);
  hideLoader();
  checkMore();
  const height = refs.list.firstElementChild.getBoundingClientRect().height;
  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
  refs.form.reset();
}

function renderNews(articles) {
  const markup = templateArticles(articles);
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function showMore() {
  refs.more.classList.remove('hidden');
}

function hideMore() {
  refs.more.classList.add('hidden');
}

function checkMore() {
  if (page >= lastPage) {
    hideMore();
  } else {
    showMore();
  }
}
function showLoader() {
  refs.loader.classList.remove('hidden');
}
function hideLoader() {
  refs.loader.classList.add('hidden');
}
