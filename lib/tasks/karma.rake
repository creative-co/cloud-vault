desc 'Run Karma test'
task :karma => :environment do
  karma = Rails.root.join('node_modules/karma/bin/karma')
  raise "Coudn't find Karma binary at #{karma}\nDid you run npm install?" unless karma.exist?
  Rails.application.assets.append_path Rails.root.join('spec', 'js')
  codebase = Rails.application.assets['test_application.js'].to_s
  Tempfile.open('compiled_app.js') do |f|
    f.write(codebase)
    f.sync
    ENV['PRECOMPILED_APP'] = f.path
    system("#{karma} start")
  end
end
