"""Ensure `app` is importable when pytest runs from the backend/ dir (CI)."""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
