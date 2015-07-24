Rails.application.routes.draw do
  root 'static_pages#landing'

  get 'static_pages/vault', as: 'vault'

  post 'keybase_proxy/getsalt'
  post 'keybase_proxy/login'
  # post 'keybase_proxy/key_fetch'

  resources :summaries, only: [:index]
  resources :projections, only: [:show, :create]
end
