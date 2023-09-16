import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# Initialize NLTK stopwords
stop_words = set(stopwords.words("english"))

# Function to preprocess and tokenize text


def preprocess_and_tokenize(text):
    words = word_tokenize(text)
    words = [word.lower() for word in words if word.isalnum()
             and word not in stop_words]
    return " ".join(words)


def check_for_plagiarism(new_project_description, existing_project_descriptions):
    preprocessed_existing_projects = [preprocess_and_tokenize(
        desc) for desc in existing_project_descriptions]
    preprocessed_new_project = preprocess_and_tokenize(new_project_description)

    all_descriptions = preprocessed_existing_projects + \
        [preprocessed_new_project]

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_descriptions)

    # Calculate cosine similarities between the new project and existing projects
    similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])

    # Set the similarity threshold
    threshold = 0.2

    # Check for potential plagiarism
    plagiarized_indices = [i for i, sim in enumerate(
        similarities[0]) if sim >= threshold]

    return plagiarized_indices

# Example usage of the function:
# existing_projects = [
#     "Voice assistant made using machine learning and speech recognition in python.",
#     "Platform for uploading projects of college students.",
#     "Data analysis project on house price prediction using machine learning.",
# ]

# new_project = "Chatbot implemented using machine learning libraries like NLTK and spacy."

# plagiarized_indices = check_for_plagiarism(new_project, existing_projects)
# if plagiarized_indices:
#     print("Potential plagiarism detected in projects:", plagiarized_indices)
# else:
#     print("No plagiarism detected.")
