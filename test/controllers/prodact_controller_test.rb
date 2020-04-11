require 'test_helper'

class ProdactControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get prodact_index_url
    assert_response :success
  end

  test "should get show" do
    get prodact_show_url
    assert_response :success
  end

end
