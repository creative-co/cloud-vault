class SummarySerializer < ActiveModel::Serializer
  attributes :project_id, :title, :last_changed_at

  def last_changed_at
    object.updated_at.strftime('%m/%d/%Y')
  end
end
