class KeybaseProxyController < ApplicationController
  LOGIN_URL = "https://keybase.io/_/api/1.0/login.json";
  GETSALT_URL = "https://keybase.io/_/api/1.0/getsalt.json";
  USER_AUTOCOMPLETE_URL = 'https://keybase.io/_/api/1.0/user/autocomplete.json'
  # KEY_FETCH_URL = "https://keybase.io/_/api/1.0/getsalt.json";

  def getsalt
    do_proxy(:post, GETSALT_URL)
  end

  def login
    do_proxy(:post, LOGIN_URL)
  end

  def user_autocomplete
    do_proxy(:get, USER_AUTOCOMPLETE_URL)
  end

  # def key_fetch
  #   do_proxy(:get, KEY_FETCH_URL)
  # end

  private

  def do_proxy(verb, url)
    if verb == :get
      url += convert(params[:kb]) if params[:kb].present?
      response = RestClient.send(verb, url)
    else
      response = RestClient.send(verb, url, params[:kb])
    end
    send_data response.body, status: response.code
  end

  def convert(json)
    hsh = JSON.parse(json)
    hsh = hsh.delete_if { |_k, v| v.blank? }
    return '' if hsh.blank?
    '?' + hsh.collect { |k, v| "#{k}=#{CGI.escape(v)}" }.join('&')
  end
end
