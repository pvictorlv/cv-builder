import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { type CVData } from "@/types/cv";
import { SECTION_HEADERS, type SectionHeaders, type LocaleStrings } from "@/lib/constants";
import { formatDate, formatDateRange, formatCompanyWithType } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 32,
  },
  name: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 2,
  },
  contactLine: {
    fontSize: 9,
    textAlign: "center",
    color: "#444",
    marginBottom: 1,
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginTop: 6,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 9,
    color: "#555",
  },
  bullet: {
    fontSize: 10,
    marginLeft: 8,
    marginBottom: 1,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.3,
    marginBottom: 1,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.3,
  },
  certItem: {
    marginBottom: 2,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
});

interface TemplateCompactProps {
  data: CVData;
  headers?: SectionHeaders;
  locale?: LocaleStrings;
}

export function TemplateCompact({ data, headers, locale }: TemplateCompactProps) {
  const h = headers ?? locale?.sectionHeaders ?? SECTION_HEADERS;
  const { contactInfo, professionalSummary, workExperience, education, skills, certifications, languages } = data;

  const contactParts = [contactInfo.email, contactInfo.phone, contactInfo.location].filter(Boolean);
  const linkParts = [contactInfo.linkedin, contactInfo.portfolio].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {contactInfo.name && <Text style={styles.name}>{contactInfo.name}</Text>}
        {contactParts.length > 0 && (
          <Text style={styles.contactLine}>{contactParts.join(" | ")}</Text>
        )}
        {linkParts.length > 0 && (
          <Text style={styles.contactLine}>{linkParts.join(" | ")}</Text>
        )}

        {professionalSummary.summary && (
          <View>
            <Text style={styles.sectionHeader}>{h.professionalSummary}</Text>
            <Text style={styles.text}>{professionalSummary.summary}</Text>
          </View>
        )}

        {workExperience.items.filter((i) => i.startDate || i.endDate || i.current).length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{h.workExperience}</Text>
            {workExperience.items
              .filter((i) => i.startDate || i.endDate || i.current)
              .map((item) => (
                <View key={item.id} style={{ marginBottom: 4 }}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.bold}>
                      {item.role}
                      {(() => {
                        const formatted = formatCompanyWithType(item.company, item.type ?? "fulltime", item.location);
                        return formatted ? ` – ${formatted}` : "";
                      })()}
                    </Text>
                    <Text style={styles.italic}>
                      {formatDateRange(item.startDate, item.endDate, item.current, locale)}
                    </Text>
                  </View>
                  {item.description &&
                    item.description.split("\n").filter(Boolean).map((line, i) => (
                      <Text key={i} style={styles.bullet}>
                        {"–"} {line.replace(/^[-•]\s*/, "")}
                      </Text>
                    ))}
                </View>
              ))}
          </View>
        )}

        {workExperience.items.filter((i) => !i.startDate && !i.endDate && !i.current).length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionHeader}>{h.projects}</Text>
            {workExperience.items
              .filter((i) => !i.startDate && !i.endDate && !i.current)
              .map((item) => (
                <View key={item.id} style={{ marginBottom: 4 }}>
                  <Text style={styles.bold}>{item.role}</Text>
                  {(item.company || item.location) && (
                    <Text style={styles.italic}>{[item.company, item.location].filter(Boolean).join(" · ")}</Text>
                  )}
                  {item.description &&
                    item.description.split("\n").filter(Boolean).map((line, i) => (
                      <Text key={i} style={styles.bullet}>
                        {"–"} {line.replace(/^[-•]\s*/, "")}
                      </Text>
                    ))}
                </View>
              ))}
          </View>
        )}

        {education.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{h.education}</Text>
            {education.items.map((item) => (
              <View key={item.id} style={{ marginBottom: 3 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>
                    {item.course}
                    {item.institution ? ` – ${item.institution}` : ""}
                  </Text>
                  <Text style={styles.italic}>
                    {formatDateRange(item.startDate, item.endDate, item.current, locale)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {skills.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{h.skills}</Text>
            <Text style={styles.skillsText}>{skills.items.join(", ")}</Text>
          </View>
        )}

        {certifications.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{h.certifications}</Text>
            {certifications.items.map((item) => (
              <View key={item.id} style={styles.certItem}>
                <Text style={styles.text}>
                  <Text style={styles.bold}>{item.name}</Text>
                  {item.issuer ? ` – ${item.issuer}` : ""}
                  {item.date ? ` (${formatDate(item.date, locale?.months)})` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {languages.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{h.languages}</Text>
            {languages.items.map((item) => (
              <View key={item.id} style={styles.langRow}>
                <Text style={styles.text}>{item.language}</Text>
                <Text style={styles.text}>{item.level}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
