from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from io import BytesIO
from datetime import datetime

def generate_resume_pdf(resume_data: dict) -> BytesIO:
    """Generate a professional PDF resume"""
    
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, 
                           topMargin=0.5*inch, bottomMargin=0.5*inch,
                           leftMargin=0.75*inch, rightMargin=0.75*inch)
    
    # Styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#a855f7'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.HexColor('#06b6d4'),
        spaceAfter=12,
        alignment=TA_CENTER,
        fontName='Helvetica'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#a855f7'),
        spaceAfter=8,
        spaceBefore=12,
        fontName='Helvetica-Bold',
        borderWidth=1,
        borderColor=colors.HexColor('#a855f7'),
        borderPadding=5,
        backColor=colors.HexColor('#f3f4f6')
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.black,
        spaceAfter=6,
        fontName='Helvetica'
    )
    
    # Build PDF content
    content = []
    
    # Header - Name and Title
    content.append(Paragraph(resume_data.get('full_name', 'Your Name'), title_style))
    content.append(Paragraph(resume_data.get('title', 'Developer'), subtitle_style))
    
    # Contact Information
    contact_info = []
    if resume_data.get('email'):
        contact_info.append(f"Email: {resume_data['email']}")
    if resume_data.get('phone'):
        contact_info.append(f"Phone: {resume_data['phone']}")
    if resume_data.get('location'):
        contact_info.append(f"Location: {resume_data['location']}")
    
    contact_text = " | ".join(contact_info)
    content.append(Paragraph(contact_text, subtitle_style))
    
    # Links
    links_info = []
    if resume_data.get('website'):
        links_info.append(f"Website: {resume_data['website']}")
    if resume_data.get('github'):
        links_info.append(f"GitHub: {resume_data['github']}")
    if resume_data.get('linkedin'):
        links_info.append(f"LinkedIn: {resume_data['linkedin']}")
    
    if links_info:
        links_text = " | ".join(links_info)
        content.append(Paragraph(links_text, body_style))
    
    content.append(Spacer(1, 0.2*inch))
    
    # Summary
    if resume_data.get('summary'):
        content.append(Paragraph("PROFESSIONAL SUMMARY", heading_style))
        content.append(Paragraph(resume_data['summary'], body_style))
        content.append(Spacer(1, 0.15*inch))
    
    # Experience
    if resume_data.get('experience'):
        content.append(Paragraph("EXPERIENCE", heading_style))
        for exp in resume_data['experience']:
            job_title = f"<b>{exp.get('title', '')}</b> at {exp.get('company', '')}"
            content.append(Paragraph(job_title, body_style))
            
            date_location = f"{exp.get('start_date', '')} - {exp.get('end_date', 'Present')} | {exp.get('location', '')}"
            content.append(Paragraph(f"<i>{date_location}</i>", body_style))
            
            if exp.get('responsibilities'):
                for resp in exp['responsibilities']:
                    content.append(Paragraph(f"• {resp}", body_style))
            
            content.append(Spacer(1, 0.1*inch))
    
    # Education
    if resume_data.get('education'):
        content.append(Paragraph("EDUCATION", heading_style))
        for edu in resume_data['education']:
            degree = f"<b>{edu.get('degree', '')}</b> - {edu.get('institution', '')}"
            content.append(Paragraph(degree, body_style))
            
            date_info = f"{edu.get('start_date', '')} - {edu.get('end_date', '')}"
            if edu.get('gpa'):
                date_info += f" | GPA: {edu['gpa']}"
            content.append(Paragraph(f"<i>{date_info}</i>", body_style))
            content.append(Spacer(1, 0.1*inch))
    
    # Skills
    if resume_data.get('skills'):
        content.append(Paragraph("SKILLS", heading_style))
        for category, skills_list in resume_data['skills'].items():
            skills_text = f"<b>{category}:</b> {', '.join(skills_list)}"
            content.append(Paragraph(skills_text, body_style))
        content.append(Spacer(1, 0.15*inch))
    
    # Projects
    if resume_data.get('projects'):
        content.append(Paragraph("FEATURED PROJECTS", heading_style))
        for proj in resume_data['projects']:
            project_title = f"<b>{proj.get('name', '')}</b>"
            content.append(Paragraph(project_title, body_style))
            
            if proj.get('description'):
                content.append(Paragraph(proj['description'], body_style))
            
            if proj.get('technologies'):
                tech_text = f"<i>Technologies: {', '.join(proj['technologies'])}</i>"
                content.append(Paragraph(tech_text, body_style))
            
            if proj.get('link'):
                content.append(Paragraph(f"Link: {proj['link']}", body_style))
            
            content.append(Spacer(1, 0.1*inch))
    
    # Certifications
    if resume_data.get('certifications'):
        content.append(Paragraph("CERTIFICATIONS", heading_style))
        for cert in resume_data['certifications']:
            cert_text = f"• <b>{cert.get('name', '')}</b> - {cert.get('issuer', '')} ({cert.get('date', '')})"
            content.append(Paragraph(cert_text, body_style))
    
    # Build PDF
    doc.build(content)
    buffer.seek(0)
    return buffer
