from playwright.sync_api import sync_playwright, expect

def test_home_feed(page):
    # Mock API responses

    # 1. Mock /api/me (User Profile)
    page.route("**/api/me", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='{"user": {"id": 1, "username": "testuser", "email": "test@example.com", "email_verified": true}}'
    ))

    # 2. Mock /api/feed/home (Home Feed)
    posts_json = """
    {
      "posts": [
        {
          "id": 101,
          "title": "Optimized Post 1",
          "content": "Content of post 1",
          "excerpt": "Content of post 1",
          "author": {"id": 2, "username": "author2"},
          "topic": {"id": 3, "name": "performance"},
          "vote_count": 5,
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        },
        {
          "id": 102,
          "title": "Optimized Post 2",
          "content": "Content of post 2",
          "excerpt": "Content of post 2",
          "author": {"id": 4, "username": "author4"},
          "topic": {"id": 5, "name": "react"},
          "vote_count": 10,
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
      ],
      "total": 2,
      "page": 1,
      "page_size": 10,
      "total_pages": 1
    }
    """
    page.route("**/api/feed/home*", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body=posts_json
    ))

    # 3. Mock /api/votes/posts/* (Vote status)
    page.route("**/api/votes/posts/*", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body='{"vote_count": 5, "user_vote_id": null}'
    ))

    # Set token
    page.add_init_script("""
        localStorage.setItem('learnloop_token', 'fake-token');
    """)

    # Go to home page
    print("Navigating to home page...")
    page.goto("http://localhost:3000/home")

    # Wait for content
    print("Waiting for content...")
    expect(page.get_by_text("Optimized Post 1")).to_be_visible(timeout=20000)
    expect(page.get_by_text("Optimized Post 2")).to_be_visible()

    # Take screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/home_feed.png", full_page=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
        test_home_feed(page)
        print("Verification successful!")
    except Exception as e:
        print(f"Verification failed: {e}")
        try:
            page.screenshot(path="verification/error.png")
        except:
            pass
    finally:
        browser.close()
