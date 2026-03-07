import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { type CVData } from "@/types/cv";
import { SECTION_HEADERS } from "@/lib/constants";
import { formatDate, formatDateRange, formatCompanyWithType } from "@/lib/utils";

const SIDEBAR_COLOR = "#2D3748";
const SIDEBAR_WIDTH = "30%";
const MAIN_WIDTH = "70%";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    flexDirection: "row",
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: SIDEBAR_COLOR,
    color: "#FFFFFF",
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  main: {
    width: MAIN_WIDTH,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  sidebarName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  sidebarSectionHeader: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#CBD5E0",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginTop: 14,
    marginBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#4A5568",
    paddingBottom: 3,
  },
  sidebarText: {
    fontSize: 9,
    color: "#E2E8F0",
    lineHeight: 1.5,
    marginBottom: 2,
  },
  sidebarSkillItem: {
    fontSize: 9,
    color: "#E2E8F0",
    marginBottom: 3,
  },
  sidebarLangRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  mainSectionHeader: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: SIDEBAR_COLOR,
    color: SIDEBAR_COLOR,
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
  certItem: {
    marginBottom: 4,
  },
});

interface TemplateElegantProps {
  data: CVData;
}

export function TemplateElegant({ data }: TemplateElegantProps) {
  const { contactInfo, professionalSummary, workExperience, education, skills, certifications, languages } = data;

  const contactLines = [
    contactInfo.email,
    contactInfo.phone,
    contactInfo.location,
    contactInfo.linkedin,
    contactInfo.portfolio,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {contactInfo.photoUrl && (
            <Image
              src={contactInfo.photoUrl}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                marginBottom: 10,
                alignSelf: "center",
              }}
            />
          )}
          {contactInfo.name && (
            <Text style={styles.sidebarName}>{contactInfo.name}</Text>
          )}

          {/* Contact */}
          {contactLines.length > 0 && (
            <View>
              <Text style={styles.sidebarSectionHeader}>Contato</Text>
              {contactLines.map((line, i) => (
                <Text key={i} style={styles.sidebarText}>{line}</Text>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills.items.length > 0 && (
            <View>
              <Text style={styles.sidebarSectionHeader}>{SECTION_HEADERS.skills}</Text>
              {skills.items.map((skill, i) => (
                <Text key={i} style={styles.sidebarSkillItem}>{skill}</Text>
              ))}
            </View>
          )}

          {/* Languages */}
          {languages.items.length > 0 && (
            <View>
              <Text style={styles.sidebarSectionHeader}>{SECTION_HEADERS.languages}</Text>
              {languages.items.map((item) => (
                <View key={item.id} style={styles.sidebarLangRow}>
                  <Text style={styles.sidebarText}>{item.language}</Text>
                  <Text style={styles.sidebarText}>{item.level}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {certifications.items.length > 0 && (
            <View>
              <Text style={styles.sidebarSectionHeader}>{SECTION_HEADERS.certifications}</Text>
              {certifications.items.map((item) => (
                <View key={item.id} style={{ marginBottom: 4 }}>
                  <Text style={{ ...styles.sidebarText, fontFamily: "Helvetica-Bold" }}>
                    {item.name}
                  </Text>
                  {item.issuer && (
                    <Text style={styles.sidebarText}>{item.issuer}</Text>
                  )}
                  {item.date && (
                    <Text style={styles.sidebarText}>{formatDate(item.date)}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main content */}
        <View style={styles.main}>
          {/* Summary */}
          {professionalSummary.summary && (
            <View>
              <Text style={styles.mainSectionHeader}>{SECTION_HEADERS.professionalSummary}</Text>
              <Text style={styles.text}>{professionalSummary.summary}</Text>
            </View>
          )}

          {/* Professional Experience */}
          {workExperience.items.filter((i) => i.startDate || i.endDate || i.current).length > 0 && (
            <View>
              <Text style={styles.mainSectionHeader}>{SECTION_HEADERS.workExperience}</Text>
              {workExperience.items.filter((i) => i.startDate || i.endDate || i.current).map((item) => (
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
          {workExperience.items.filter((i) => !i.startDate && !i.endDate && !i.current).length > 0 && (
            <View>
              <Text style={styles.mainSectionHeader}>{SECTION_HEADERS.projects}</Text>
              {workExperience.items.filter((i) => !i.startDate && !i.endDate && !i.current).map((item) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
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
              <Text style={styles.mainSectionHeader}>{SECTION_HEADERS.education}</Text>
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
      </Page>
    </Document>
  );
}
