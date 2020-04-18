require 'test_helper'

class ListingpageControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get listingpage_index_url
    assert_response :success
  end

end
