import unittest

from app.book_publish_forge_app import build_endpoint_url, classify_mode, convert_text


class ClassifyModeTests(unittest.TestCase):
    def test_detects_configured_keywords_case_insensitively(self):
        self.assertEqual(classify_mode("They shared an INTIMATE kiss."), "Erotic")

    def test_returns_normal_when_no_keyword_is_present(self):
        self.assertEqual(classify_mode("They walked home beneath the rain."), "Normal")

    def test_empty_text_is_normal_at_the_pure_helper_boundary(self):
        self.assertEqual(classify_mode(""), "Normal")


class ConvertTextTests(unittest.TestCase):
    def test_erotic_conversion_preserves_existing_behavior(self):
        self.assertEqual(
            convert_text("They smile and hug.", "erotic"),
            "They lingering smile and slow embrace.",
        )

    def test_normal_conversion_preserves_existing_behavior(self):
        self.assertEqual(
            convert_text("A naked touch carried passion.", "normal"),
            "A bare contact carried emotion.",
        )

    def test_unknown_target_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "Unsupported conversion target"):
            convert_text("Draft", "mystery")


class EndpointUrlTests(unittest.TestCase):
    def test_joins_with_one_separator(self):
        self.assertEqual(
            build_endpoint_url("http://127.0.0.1:11434/", "/api/tags"),
            "http://127.0.0.1:11434/api/tags",
        )


if __name__ == "__main__":
    unittest.main()
