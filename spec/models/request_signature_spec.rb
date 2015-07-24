require 'rails_helper'

RSpec.describe RequestSignature, type: :model do
  let(:request_signature) { described_class.new(base64_signature, 'vovayartsev') }

  context 'with a valid signature' do
    # 1234567890abcdefghijklmnopqrstuvwxyz -> PGP_encode -> Base64
    let(:base64_signature) { 'LS0tLS1CRUdJTiBQR1AgU0lHTkVEIE1FU1NBR0UtLS0tLQpIYXNoOiBTSEE1MTIKCjEyMzQ1Njc4OTBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5egotLS0tLUJFR0lOIFBHUCBTSUdOQVRVUkUtLS0tLQpWZXJzaW9uOiBLZXliYXNlIE9wZW5QR1AgdjIuMC44CkNvbW1lbnQ6IGh0dHBzOi8va2V5YmFzZS5pby9jcnlwdG8KCndzQmNCQUFCQ2dBR0JRSlZGdlFOQUFvSkVPbmJLclBBckVxWVRiZ0gvUlNzUW5WQ0dEQWkvSW1vYjFkQ3M2MWEKazJUSDBWSHdhOHFjbm00d1pSZ2FiOWh6UmhBL3R1UHFUUHRNTmYwT28wNGhCU1dxbzRML0lVbUorOVdac211awpPZ0JscU5aaHo1UU80VzNMVmV3M2JKUGRZKy9iVE5sd090ZFJZMDZNWU10MWJyYWs0MHNtZGg1NitkVG9HdEM0CnlBYlpxdjRsRTVGRTgrSW9zRzZVZWNxVHloYmNmZ3ljTnZVU2JyV3JsRGNPQ0M0N1h5U0x2VkpXb21RQnRKRFQKNUVMN3FxUk15Vk5NMWtBS01UeFEwSCtkWkJpaE9reXlZakdObVJsT2JETW9vNjk1bW16V3lDTXZvZlpETXAvTwpaNTZRazB0OHlEU0JOOWxBamJodVVmUGl6WnRYQTkyNkFSWXBKcFI5enUzT1kySnM4bC92cVdsdzNBKzU4M2s9Cj04ZzVwCi0tLS0tRU5EIFBHUCBTSUdOQVRVUkUtLS0tLQoK' }

    it 'validates and decodes signature' do
      expect { request_signature.validate! }.not_to raise_error
      expect(request_signature.kb_login).to eq('vovayartsev')
      expect(request_signature.timestamp.min).to eq(33)
      expect(request_signature.csrf_token).to eq('1234567890abcdefghijklmnopqrstuvwxyz')
    end
  end

  context 'with invalid signature' do
    let(:base64_signature) { 'ABCDEFGH' }
    it 'raises error' do
      expect { request_signature.validate! }.to raise_error(RequestSignature::Invalid)
    end
  end
end

