package insults;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

/**
 *
 * @author sgb-io
 */
public class Insults {

    /**
     * The main program. Processes the insults against the stopfile,
     * prints out the top 25 to stdout.
     * @param args
     * @throws java.io.IOException
     */
    public static void main(String[] args) throws IOException {
        if (args.length != 2) {
            System.err.println("Please provide insults and stopwords!");
            System.exit(0);
        }
        
        String insultsPath = args[0];
        String stopWordsPath = args[1];
        String rawInsults = new String(Files.readAllBytes(Paths.get(insultsPath)));
        String rawStopWords = new String(Files.readAllBytes(Paths.get(stopWordsPath)));

        List<String> insults = getInsultWords(rawInsults);
        List<String> stopWords = getStopWords(rawStopWords);

        List<String> processedInsults;
        processedInsults = processInsults(insults, stopWords);

        HashMap<String, Integer> unsortedInsultCounts = countInsults(processedInsults);
        HashMap<String, Integer> topInsults = getTopInsults(unsortedInsultCounts);

        int rank = 1;
        for (HashMap.Entry<String, Integer> entry : topInsults.entrySet()) {
            String word = entry.getKey();
            Integer occurences = entry.getValue();
            System.out.println(
                    String.format(
                            "#%s - \"%s\", %s occurrences",
                            rank,
                            word,
                            occurences
                    )
            );
            rank++;
        }
    }
    
    /**
     * Accepts a HashMap of counted words, orders by occurrence then alphabetic.
     * Returns the top 25.
     * @param allInsults
     * @return HashMap<String, Integer>
     */
    private static HashMap<String, Integer> getTopInsults(HashMap<String, Integer> allInsults) {
        HashMap<String, Integer> topInsults;
        topInsults = allInsults
                .entrySet()
                .stream()
                .sorted(
                        HashMap.Entry.<String, Integer>comparingByValue().reversed()
                                .thenComparing(HashMap.Entry.comparingByKey())
                )
                .limit(25)
                .collect(
                    Collectors.toMap(
                            HashMap.Entry::getKey, HashMap.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new
                    )
                );

        return topInsults;
    }
    
    /**
     * Accepts a list of words, generates a HashMap counting occurrences.
     * @param insults
     * @return HashMap<String, Integer>
     */
    private static HashMap<String, Integer> countInsults(List<String> insults) {
        HashMap<String, Integer> unsortedInsultCounts;
        unsortedInsultCounts = new HashMap<>();

        insults.forEach((insult) -> {
            Integer existingCount = unsortedInsultCounts.get(insult);
            if (existingCount == null) {
                unsortedInsultCounts.put(insult, 1);
            } else {
                unsortedInsultCounts.put(insult, existingCount + 1);
            }
        });

        return unsortedInsultCounts;
    }
    
    /**
     * Accepts a list of insults and stopwords, lowercases all words,
     * removes non-alphanumeric characters for each word, returns the
     * remaining words.
     * @param insults
     * @param stopWords
     * @return List<String>
     */
    private static List<String> processInsults(List<String> insults, List<String> stopWords) {
        List<String> processedInsults = new ArrayList<>();

        for (String insult : insults) {
            String normalized = normalizeWord(insult);
            String alphanumeric = removeAlphanumeric(normalized);

            if ("".equals(alphanumeric)) {
                continue;
            }

            if (stopWords.contains(alphanumeric) || stopWords.contains(normalized)) {
                continue;
            }

            processedInsults.add(alphanumeric);
        }

        return processedInsults;
    }
    
    /**
     * Lowercases a word.
     * @param word
     * @return String
     */
    private static String normalizeWord(String word) {
        return word.toLowerCase();
    }
    
    /**
     * Removes non-alphanumeric characters from a string.
     * @param word
     * @return String
     */
    private static String removeAlphanumeric(String word) {
        return word
                .replaceAll("\\s+","")
                .replaceAll("[^a-z]", "");
    }
    
    /**
     * Accepts a whole-file string of insults, breaks into
     * lines and then words, returns as a list of insults.
     * @param rawInsults
     * @return List<String>
     */
    private static List<String> getInsultWords(String rawInsults) {
        List<String> words = new ArrayList<>();
        String[] lines = rawInsults.split("\n");
        for (String line : lines) {
            String[] lineWords = line.split(" ");
            words.addAll(Arrays.asList(lineWords));
        }

        return words;
    }
    
    /**
     * Accepts a whole-file string of stopwords, breaks
     * into lines and returns as a list of stopwords.
     * @param rawStopWords
     * @return List<String>
     */
    private static List<String> getStopWords(String rawStopWords) {
        List<String> words = new ArrayList<>();
        String[] lines = rawStopWords.split("\n");
        words.addAll(Arrays.asList(lines));

        for (int n = 0; n < words.size(); n++) {
            words.set(n, words.get(n).replace("\n", "").replace("\r", ""));
        }

        return words;
    }
}
