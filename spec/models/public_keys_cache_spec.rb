require 'rails_helper'

RSpec.describe PublicKeysCache, type: :model do
  after { described_class.clear }
  let(:fetched) { described_class.fetch('vovayartsev') }
  subject { fetched }

  describe 'with gpg' do
    subject { PgpEngine.verify(sig_path.read, fetched).valid? }

    context 'when signed by vovayartsev' do
      let(:sig_path) { Rails.root.join('spec', 'examples', 'signature_by_vovayartsev.asc') }
      it { should eq(true) }
    end

    context 'when signed by other user' do
      let(:sig_path) { Rails.root.join('spec', 'examples', 'signature_by_other_user.asc') }
      it { should eq(false) }
    end
  end
end
