class Chatroom < ApplicationRecord
  validates :name, presence: true
  has_many :messages
end
