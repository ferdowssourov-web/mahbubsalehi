import requests
import sys
import io
import os
from datetime import datetime

class BengaliPortfolioAPITester:
    def __init__(self, base_url="https://mahbub-showcase.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.admin_token = None
        print(f"Testing Bengali Political Portfolio API at: {self.api_url}")

    def run_test(self, name, method, endpoint, expected_status, data=None, require_auth=False):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        # Add authorization header if required and token is available
        if require_auth and self.admin_token:
            headers['Authorization'] = f'Bearer {self.admin_token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    print(f"Response body: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Error body: {response.text[:200]}...")

            return success, response.json() if response.content else {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET", 
            "",
            200
        )

    def test_status_endpoints(self):
        """Test status endpoints"""
        # Test POST status
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        success, response = self.run_test(
            "POST Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )
        
        if not success:
            return False
            
        # Test GET status
        success, _ = self.run_test(
            "GET Status Checks",
            "GET",
            "status",
            200
        )
        
        return success

    def test_contact_endpoints(self):
        """Test contact form endpoints"""
        # Test POST contact
        test_contact = {
            "name": f"পরীক্ষামূলক নাম {datetime.now().strftime('%H%M%S')}",
            "phone": "+8801700000000",
            "email": "test@example.com",
            "message": "এটি একটি পরীক্ষামূলক বার্তা। ব্যারিস্টার সালেহী সাহেবের ওয়েবসাইট পরীক্ষা করা হচ্ছে।"
        }
        
        success, response = self.run_test(
            "POST Contact Message",
            "POST",
            "contact", 
            200,
            data=test_contact
        )
        
        if not success:
            return False
            
        # Verify the response contains expected fields
        if response and 'name' in response and 'message' in response:
            print("✅ Contact message contains expected fields")
        else:
            print("❌ Contact message missing expected fields")
            
        # Test GET contact messages
        success, messages = self.run_test(
            "GET Contact Messages",
            "GET",
            "contact",
            200
        )
        
        if success and isinstance(messages, list):
            print(f"✅ Retrieved {len(messages)} contact messages")
        
        return success

    def test_admin_login(self):
        """Test admin login with correct credentials"""
        login_data = {
            "username": "admin",
            "password": "admin123"
        }
        
        success, response = self.run_test(
            "Admin Login (Valid Credentials)",
            "POST",
            "admin/login",
            200,
            data=login_data
        )
        
        if success and 'token' in response:
            self.admin_token = response['token']
            print(f"✅ Got admin token: {self.admin_token[:20]}...")
        
        return success

    def test_admin_login_invalid(self):
        """Test admin login with invalid credentials"""
        invalid_data = {
            "username": "admin",
            "password": "wrongpassword"
        }
        
        success, response = self.run_test(
            "Admin Login (Invalid Credentials)",
            "POST", 
            "admin/login",
            401,
            data=invalid_data
        )
        
        return success

    def test_admin_me(self):
        """Test admin authentication check"""
        if not self.admin_token:
            print("❌ No admin token available for authentication test")
            return False
            
        success, response = self.run_test(
            "Admin Authentication Check",
            "GET",
            "admin/me", 
            200,
            require_auth=True
        )
        
        if success and 'username' in response:
            print(f"✅ Authenticated as: {response['username']}")
        
        return success

    def test_activities_public(self):
        """Test public activities endpoint"""
        success, response = self.run_test(
            "GET Activities (Public)",
            "GET",
            "activities",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} published activities")
            return True
            
        return False

    def test_activities_crud(self):
        """Test activities CRUD operations with admin auth"""
        if not self.admin_token:
            print("❌ No admin token available for CRUD tests")
            return False

        # Test creating a new activity
        new_activity = {
            "title": f"পরীক্ষামূলক কার্যক্রম {datetime.now().strftime('%H%M%S')}",
            "category": "পরীক্ষা",
            "image_url": "https://example.com/test.jpg",
            "content": "এটি একটি পরীক্ষামূলক কার্যক্রম পোস্ট।",
            "date": "২০২৫",
            "is_published": True
        }
        
        success, response = self.run_test(
            "POST Activity (Create)",
            "POST",
            "activities",
            200,
            data=new_activity,
            require_auth=True
        )
        
        if not success or 'id' not in response:
            print("❌ Failed to create activity")
            return False
            
        activity_id = response['id']
        print(f"✅ Created activity with ID: {activity_id}")

        # Test updating the activity
        update_data = {
            "title": "আপডেট করা কার্যক্রম",
            "is_published": False
        }
        
        success, response = self.run_test(
            "PUT Activity (Update)",
            "PUT",
            f"activities/{activity_id}",
            200,
            data=update_data,
            require_auth=True
        )
        
        if not success:
            print("❌ Failed to update activity")
            return False

        # Test getting the specific activity
        success, response = self.run_test(
            "GET Single Activity",
            "GET",
            f"activities/{activity_id}",
            200
        )
        
        if success and response.get('title') == "আপডেট করা কার্যক্রম":
            print("✅ Activity updated successfully")
        
        # Test deleting the activity
        success, response = self.run_test(
            "DELETE Activity",
            "DELETE",
            f"activities/{activity_id}",
            200,
            require_auth=True
        )
        
        if success:
            print("✅ Activity deleted successfully")
        
        return success

    def test_activity_detail(self):
        """Test getting a single activity by ID"""
        # First get all activities to get a valid ID
        success, activities = self.run_test(
            "GET Activities for Detail Test",
            "GET",
            "activities",
            200
        )
        
        if not success or not activities:
            print("❌ No activities available for detail test")
            return False
            
        # Test getting the first activity by ID
        activity_id = activities[0]['id']
        success, response = self.run_test(
            "GET Single Activity Detail",
            "GET",
            f"activities/{activity_id}",
            200
        )
        
        if success and response:
            expected_fields = ['id', 'title', 'category', 'image_url', 'content', 'date']
            missing_fields = [field for field in expected_fields if field not in response]
            if missing_fields:
                print(f"❌ Activity detail missing fields: {missing_fields}")
                return False
            print(f"✅ Activity detail contains all required fields")
            print(f"✅ Activity ID: {response['id']}, Title: {response['title'][:50]}...")
        
        # Test non-existent activity ID
        success, response = self.run_test(
            "GET Non-existent Activity",
            "GET",
            "activities/non-existent-id",
            404
        )
        
        if success:
            print("✅ Non-existent activity returns 404 as expected")
        
        return success

    def test_image_upload(self):
        """Test image upload endpoint"""
        if not self.admin_token:
            print("❌ No admin token available for image upload test")
            return False

        # Create a small test image in memory
        test_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8\x0f\x00\x00\x01\x00\x01\x00\x00\x00\x00IEND\xaeB`\x82'
        
        try:
            # Prepare file upload
            files = {
                'file': ('test.png', io.BytesIO(test_image_content), 'image/png')
            }
            headers = {
                'Authorization': f'Bearer {self.admin_token}'
            }
            
            url = f"{self.api_url}/upload"
            print(f"\n🔍 Testing Image Upload...")
            print(f"URL: {url}")
            
            response = requests.post(url, files=files, headers=headers, timeout=30)
            print(f"Response Status: {response.status_code}")
            
            self.tests_run += 1
            if response.status_code == 200:
                self.tests_passed += 1
                result = response.json()
                if 'url' in result and 'filename' in result:
                    print(f"✅ Passed - Image uploaded successfully")
                    print(f"Upload URL: {result['url']}")
                    print(f"Filename: {result['filename']}")
                    return True, result
                else:
                    print(f"❌ Upload response missing required fields")
                    return False, {}
            else:
                print(f"❌ Failed - Expected 200, got {response.status_code}")
                print(f"Error: {response.text[:200]}...")
                return False, {}
                
        except Exception as e:
            print(f"❌ Image upload failed with error: {str(e)}")
            return False, {}

    def test_static_file_serving(self):
        """Test static file serving after upload"""
        if not self.admin_token:
            print("❌ No admin token available for static file test")
            return False
            
        # First upload a test image
        upload_success, upload_result = self.test_image_upload()
        if not upload_success or 'url' not in upload_result:
            print("❌ Cannot test static files without successful upload")
            return False
            
        # Test accessing the uploaded file
        file_url = f"{self.base_url}{upload_result['url']}"
        print(f"\n🔍 Testing Static File Access...")
        print(f"URL: {file_url}")
        
        try:
            response = requests.get(file_url, timeout=10)
            print(f"Response Status: {response.status_code}")
            
            self.tests_run += 1
            if response.status_code == 200:
                self.tests_passed += 1
                content_type = response.headers.get('Content-Type', '')
                if 'image' in content_type:
                    print(f"✅ Passed - Static file served with correct content type: {content_type}")
                    return True
                else:
                    print(f"✅ Passed - Static file served (Content-Type: {content_type})")
                    return True
            else:
                print(f"❌ Failed - Expected 200, got {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Static file access failed: {str(e)}")
            return False

def main():
    tester = BengaliPortfolioAPITester()
    
    print("=" * 60)
    print("🇧🇩 BENGALI POLITICAL PORTFOLIO API TESTING WITH ADMIN")
    print("=" * 60)

    # Test API root
    if not tester.test_api_root():
        print("❌ API Root failed, stopping tests")
        return 1

    # Test status endpoints
    if not tester.test_status_endpoints():
        print("❌ Status endpoints failed")

    # Test contact endpoints (main functionality)
    if not tester.test_contact_endpoints():
        print("❌ Contact endpoints failed")

    # Test admin login with valid credentials
    if not tester.test_admin_login():
        print("❌ Admin login failed")
        return 1

    # Test admin login with invalid credentials
    if not tester.test_admin_login_invalid():
        print("❌ Invalid admin login test failed")

    # Test admin authentication
    if not tester.test_admin_me():
        print("❌ Admin authentication test failed")

    # Test public activities endpoint
    if not tester.test_activities_public():
        print("❌ Public activities test failed")

    # Test activities CRUD operations
    if not tester.test_activities_crud():
        print("❌ Activities CRUD tests failed")

    # Test admin contacts
    if not tester.test_admin_contacts():
        print("❌ Admin contacts test failed")

    # NEW FEATURES TESTING
    print("\n" + "🆕 TESTING NEW FEATURES" + "=" * 40)
    
    # Test activity detail endpoint
    if not tester.test_activity_detail():
        print("❌ Activity detail test failed")

    # Test image upload functionality  
    if not tester.test_image_upload():
        print("❌ Image upload test failed")

    # Test static file serving
    if not tester.test_static_file_serving():
        print("❌ Static file serving test failed")

    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS: {tester.tests_passed}/{tester.tests_run} tests passed")
    print("=" * 60)
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100
    if success_rate >= 90:
        print("🎉 Backend tests mostly successful!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())