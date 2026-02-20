import requests
import sys
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

    def test_admin_contacts(self):
        """Test admin contacts endpoint"""
        if not self.admin_token:
            print("❌ No admin token available for contacts test")
            return False
            
        success, response = self.run_test(
            "GET Admin Contacts",
            "GET",
            "admin/contacts",
            200,
            require_auth=True
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} contact messages")
            return True
            
        return False

def main():
    tester = BengaliPortfolioAPITester()
    
    print("=" * 60)
    print("🇧🇩 BENGALI POLITICAL PORTFOLIO API TESTING")
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

    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS: {tester.tests_passed}/{tester.tests_run} tests passed")
    print("=" * 60)
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend API tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())