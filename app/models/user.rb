class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :rides
  has_many :reports
  
  before_validation :strip_whitespace
  
  # uncomment when adding password validation
  # has_secure_password
  # validates :password, length: { minimum: 4 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :first_name, presence: true
  validates :last_name, presence: true

  def strip_whitespace
    self.first_name.strip! unless self.first_name.nil?
    self.last_name.strip! unless self.last_name.nil?
    self.email.strip! unless self.email.nil?
  end

  def self.authenticate_with_credentials(email:, password:)
    user = User.where('lower(email) = ?', email.strip.downcase).first
    user && user.authenticate(password)? user : nil
  end
end
