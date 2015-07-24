module SpecMacros
  SIGNED_TEAM = File.read(Rails.root.join('spec', 'messages', 'signed_team.pgp'))

  def fake_authorization
    before do
      expect(controller).to receive(:validate_request_signature)
      allow(controller).to receive(:request_signature).and_return(double(:request_signature, kb_login: 'vovayartsev'))
    end
  end
end