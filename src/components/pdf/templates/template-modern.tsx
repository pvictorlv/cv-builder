import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { type CVData } from "@/types/cv";
import { SECTION_HEADERS } from "@/lib/constants";
import { formatDate, formatDateRange, formatCompanyWithType } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 36,
  },
  name: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 3,
  },
  contactLine: {
    fontSize: 10,
    textAlign: "center",
    color: "#444",
    marginBottom: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginTop: 10,
    marginBottom: 3,
    paddingBottom: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.8,
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
    fontSize: 10,
    color: "#555",
  },
  bullet: {
    fontSize: 11,
    marginLeft: 10,
    marginBottom: 1,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.35,
    marginBottom: 1,
  },
  skillsText: {
    fontSize: 11,
    lineHeight: 1.4,
  },
  certItem: {
    marginBottom: 3,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
});

interface TemplateModernProps {
  data: CVData;
}

export function TemplateModern({ data }: TemplateModernProps) {
  const { contactInfo, professionalSummary, workExperience, education, skills, certifications, languages } = data;

  const contactParts = [contactInfo.email, contactInfo.phone, contactInfo.location].filter(Boolean);
  const linkParts = [contactInfo.linkedin, contactInfo.portfolio].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {contactInfo.name && <Text style={styles.name}>{contactInfo.name}</Text>}
        {contactParts.length > 0 && (
          <Text style={styles.contactLine}>{contactParts.join("  |  ")}</Text>
        )}
        {linkParts.length > 0 && (
          <Text style={styles.contactLine}>{linkParts.join("  |  ")}</Text>
        )}

        {professionalSummary.summary && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.professionalSummary}</Text>
            <Text style={styles.text}>{professionalSummary.summary}</Text>
          </View>
        )}

        {workExperience.items.filter((i) => i.startDate || i.endDate || i.current).length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.workExperience}</Text>
            {workExperience.items.filter((i) => i.startDate || i.endDate || i.current).map((item) => (
              <View key={item.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{item.role}</Text>
                  <Text style={styles.italic}>
                    {formatDateRange(item.startDate, item.endDate, item.current)}
                  </Text>
                </View>
                {(item.company || (item.type && item.type !== "fulltime")) && (
                  <Text style={styles.italic}>{formatCompanyWithType(item.company, item.type ?? "fulltime")}</Text>
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

        {workExperience.items.filter((i) => !i.startDate && !i.endDate && !i.current).length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.projects}</Text>
            {workExperience.items.filter((i) => !i.startDate && !i.endDate && !i.current).map((item) => (
              <View key={item.id} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>{item.role}</Text>
                {item.company && (
                  <Text style={styles.italic}>{item.company}</Text>
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
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.education}</Text>
            {education.items.map((item) => (
              <View key={item.id} style={{ marginBottom: 4 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{item.course}</Text>
                  <Text style={styles.italic}>
                    {formatDateRange(item.startDate, item.endDate, item.current)}
                  </Text>
                </View>
                {item.institution && <Text style={styles.italic}>{item.institution}</Text>}
              </View>
            ))}
          </View>
        )}

        {skills.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.skills}</Text>
            <Text style={styles.skillsText}>{skills.items.join(", ")}</Text>
          </View>
        )}

        {certifications.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.certifications}</Text>
            {certifications.items.map((item) => (
              <View key={item.id} style={styles.certItem}>
                <Text style={styles.text}>
                  <Text style={styles.bold}>{item.name}</Text>
                  {item.issuer ? ` – ${item.issuer}` : ""}
                  {item.date ? ` (${formatDate(item.date)})` : ""}
                </Text>
                {item.url && (
                  <Text style={{ fontSize: 9, color: "#555" }}>{item.url}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {languages.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.languages}</Text>
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
