import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { type CVData } from "@/types/cv";
import { SECTION_HEADERS } from "@/lib/constants";
import { formatDate, formatDateRange } from "@/lib/utils";

const ACCENT = "#059669";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    flexDirection: "row",
  },
  accentStripe: {
    width: 4,
    backgroundColor: ACCENT,
  },
  content: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 36,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#1A202C",
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 2,
  },
  contactItem: {
    fontSize: 9,
    color: "#4A5568",
    marginRight: 14,
    marginBottom: 2,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#CBD5E0",
    marginTop: 8,
    marginBottom: 8,
  },
  twoColumns: {
    flexDirection: "row",
    gap: 20,
  },
  columnLeft: {
    width: "60%",
  },
  columnRight: {
    width: "40%",
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 5,
    color: ACCENT,
    borderBottomWidth: 0.5,
    borderBottomColor: ACCENT,
    paddingBottom: 2,
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
    fontSize: 9,
    color: "#555",
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 2,
  },
  bullet: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  skillsText: {
    fontSize: 10,
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

interface TemplateExecutiveProps {
  data: CVData;
}

export function TemplateExecutive({ data }: TemplateExecutiveProps) {
  const { contactInfo, professionalSummary, workExperience, education, skills, certifications, languages } = data;

  const contactParts = [
    contactInfo.email,
    contactInfo.phone,
    contactInfo.location,
  ].filter(Boolean);
  const linkParts = [contactInfo.linkedin, contactInfo.portfolio].filter(Boolean);

  const hasRightColumn = skills.items.length > 0 || languages.items.length > 0 || certifications.items.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Accent stripe */}
        <View style={styles.accentStripe} />

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={contactInfo.photoUrl ? { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" } : {}}>
            <View style={contactInfo.photoUrl ? { flex: 1 } : {}}>
              {contactInfo.name && (
                <Text style={styles.name}>{contactInfo.name}</Text>
              )}
              {contactParts.length > 0 && (
                <View style={styles.contactRow}>
                  {contactParts.map((part, i) => (
                    <Text key={i} style={styles.contactItem}>{part}</Text>
                  ))}
                </View>
              )}
              {linkParts.length > 0 && (
                <View style={styles.contactRow}>
                  {linkParts.map((part, i) => (
                    <Text key={i} style={styles.contactItem}>{part}</Text>
                  ))}
                </View>
              )}
            </View>
            {contactInfo.photoUrl && (
              <Image
                src={contactInfo.photoUrl}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  marginLeft: 12,
                }}
              />
            )}
          </View>

          {/* Summary */}
          {professionalSummary.summary && (
            <View>
              <View style={styles.divider} />
              <Text style={styles.text}>{professionalSummary.summary}</Text>
            </View>
          )}

          {/* Two-column layout */}
          <View style={styles.twoColumns}>
            {/* Left column: Experience + Education */}
            <View style={hasRightColumn ? styles.columnLeft : { width: "100%" }}>
              {/* Work Experience */}
              {workExperience.items.length > 0 && (
                <View>
                  <Text style={styles.sectionHeader}>{SECTION_HEADERS.workExperience}</Text>
                  {workExperience.items.map((item) => (
                    <View key={item.id} style={{ marginBottom: 8 }}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.bold}>{item.role}</Text>
                        <Text style={styles.italic}>
                          {formatDateRange(item.startDate, item.endDate, item.current)}
                        </Text>
                      </View>
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
            </View>

            {/* Right column: Skills, Languages, Certifications */}
            {hasRightColumn && (
              <View style={styles.columnRight}>
                {skills.items.length > 0 && (
                  <View>
                    <Text style={styles.sectionHeader}>{SECTION_HEADERS.skills}</Text>
                    <Text style={styles.skillsText}>{skills.items.join(", ")}</Text>
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
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
