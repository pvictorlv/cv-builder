import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { type CVData } from "@/types/cv";
import { SECTION_HEADERS } from "@/lib/constants";
import { formatDate, formatDateRange, formatCompanyWithType } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 40,
  },
  name: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 10,
    textAlign: "center",
    color: "#333",
    marginBottom: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginTop: 12,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
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
    marginLeft: 12,
    marginBottom: 2,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.4,
    marginBottom: 2,
  },
  skillsText: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  certItem: {
    marginBottom: 4,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
});

interface TemplateClassicProps {
  data: CVData;
}

export function TemplateClassic({ data }: TemplateClassicProps) {
  const { contactInfo, professionalSummary, workExperience, education, skills, certifications, languages } = data;

  const contactParts = [contactInfo.email, contactInfo.phone, contactInfo.location].filter(Boolean);
  const linkParts = [contactInfo.linkedin, contactInfo.portfolio].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Contact */}
        {contactInfo.name && <Text style={styles.name}>{contactInfo.name}</Text>}
        {contactParts.length > 0 && (
          <Text style={styles.contactLine}>{contactParts.join("  |  ")}</Text>
        )}
        {linkParts.length > 0 && (
          <Text style={styles.contactLine}>{linkParts.join("  |  ")}</Text>
        )}

        {/* Summary */}
        {professionalSummary.summary && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.professionalSummary}</Text>
            <Text style={styles.text}>{professionalSummary.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {workExperience.items.filter((i) => i.type !== "sideproject").length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.workExperience}</Text>
            {workExperience.items.filter((i) => i.type !== "sideproject").map((item) => (
              <View key={item.id} style={{ marginBottom: 8 }}>
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
                      {"\u2022"} {line.replace(/^[-•]\s*/, "")}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {workExperience.items.filter((i) => i.type === "sideproject").length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.projects}</Text>
            {workExperience.items.filter((i) => i.type === "sideproject").map((item) => (
              <View key={item.id} style={{ marginBottom: 6 }}>
                <Text style={styles.bold}>{item.role}</Text>
                {item.company && (
                  <Text style={styles.italic}>{item.company}</Text>
                )}
                {item.description &&
                  item.description.split("\n").filter(Boolean).map((line, i) => (
                    <Text key={i} style={styles.bullet}>
                      {"\u2022"} {line.replace(/^[-•]\s*/, "")}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.education}</Text>
            {education.items.map((item) => (
              <View key={item.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.bold}>{item.course}</Text>
                  <Text style={styles.italic}>
                    {formatDateRange(item.startDate, item.endDate, item.current)}
                  </Text>
                </View>
                {item.institution && (
                  <Text style={styles.italic}>{item.institution}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.items.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>{SECTION_HEADERS.skills}</Text>
            <Text style={styles.skillsText}>{skills.items.join(", ")}</Text>
          </View>
        )}

        {/* Certifications */}
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

        {/* Languages */}
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
