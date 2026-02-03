import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { type CVData } from "@/types/cv";
import { SECTION_HEADERS } from "@/lib/constants";
import { formatDate, formatDateRange, formatCompanyWithType } from "@/lib/utils";

const ACCENT = "#2563EB";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    backgroundColor: ACCENT,
    color: "#FFFFFF",
    paddingVertical: 24,
    paddingHorizontal: 40,
  },
  headerName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  headerContactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  headerContactItem: {
    fontSize: 9,
    color: "#DBEAFE",
    marginRight: 12,
  },
  body: {
    paddingHorizontal: 40,
    paddingTop: 16,
    paddingBottom: 30,
  },
  sectionHeader: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 6,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
    color: ACCENT,
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
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillTag: {
    fontSize: 9,
    backgroundColor: "#DBEAFE",
    color: ACCENT,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    marginBottom: 4,
    marginRight: 4,
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

interface TemplateCreativeProps {
  data: CVData;
}

export function TemplateCreative({ data }: TemplateCreativeProps) {
  const { contactInfo, professionalSummary, workExperience, education, skills, certifications, languages } = data;

  const contactParts = [
    contactInfo.email,
    contactInfo.phone,
    contactInfo.location,
    contactInfo.linkedin,
    contactInfo.portfolio,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, contactInfo.photoUrl ? { flexDirection: "row", alignItems: "center", gap: 16 } : {}]}>
          {contactInfo.photoUrl && (
            <Image
              src={contactInfo.photoUrl}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
              }}
            />
          )}
          <View style={contactInfo.photoUrl ? { flex: 1 } : {}}>
            {contactInfo.name && (
              <Text style={styles.headerName}>{contactInfo.name}</Text>
            )}
            {contactParts.length > 0 && (
              <View style={styles.headerContactRow}>
                {contactParts.map((part, i) => (
                  <Text key={i} style={styles.headerContactItem}>{part}</Text>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Summary */}
          {professionalSummary.summary && (
            <View>
              <Text style={styles.sectionHeader}>{SECTION_HEADERS.professionalSummary}</Text>
              <Text style={styles.text}>{professionalSummary.summary}</Text>
            </View>
          )}

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
              <View style={styles.skillsContainer}>
                {skills.items.map((skill, i) => (
                  <Text key={i} style={styles.skillTag}>{skill}</Text>
                ))}
              </View>
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
        </View>
      </Page>
    </Document>
  );
}
