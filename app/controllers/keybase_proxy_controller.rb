class KeybaseProxyController < ApplicationController
  LOGIN_URL = "https://keybase.io/_/api/1.0/login.json";
  GETSALT_URL = "https://keybase.io/_/api/1.0/getsalt.json";
  KEY_FETCH_URL = "https://keybase.io/_/api/1.0/getsalt.json";

  def getsalt
    do_proxy(:post, GETSALT_URL)
  end

  def login
    do_proxy(:post, LOGIN_URL)
  end

  def key_fetch
    do_proxy(:get, KEY_FETCH_URL)
  end

  private

  def do_proxy(verb, url)
    response = RestClient.send(verb, url, params[:kb])
    send_data response.body, status: response.code
  end
end
